import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { connectDB, disconnectDB } from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import inquiryRouter from './routes/inquiry.routes.js';
import wishlistRouter from './routes/wishlist.routes.js';
import contactRouter from './routes/contact.routes.js';
import adminRouter from './routes/admin.routes.js';
import chatRouter from './routes/chat.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

// Catch unhandled exceptions before anything else
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...', err);
    process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Database
connectDB();

// Trust reverse proxies in production (e.g. Render, Railway, AWS, Nginx, Heroku)
if (isProduction) {
    app.set('trust proxy', 1);
}

// Security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.disable('x-powered-by');

// Response compression
app.use(compression());

// HTTP request logging
app.use(morgan(isProduction ? 'combined' : 'dev'));

// CORS configuration
const parseAllowedOrigins = () => {
    const origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ];

    const envUrls = [process.env.FRONTEND_URL, process.env.CLIENT_URL].filter(Boolean);
    envUrls.forEach((url) => {
        // Support comma-separated URLs in env
        url.split(',').forEach((singleUrl) => {
            const trimmed = singleUrl.trim();
            if (trimmed && !origins.includes(trimmed)) {
                origins.push(trimmed);
            }
        });
    });

    return origins;
};

const allowedOrigins = parseAllowedOrigins();

const corsOptions = {
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            (!isProduction && origin.startsWith("http://localhost:"))
        ) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsing with safe size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25, // Limit auth attempts to 25 per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again after 15 minutes.'
    }
});

app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);

// Health check endpoint for uptime monitors and load balancers
app.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    res.status(dbState === 1 ? 200 : 503).json({
        status: dbState === 1 ? 'ok' : 'degraded',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        database: dbStatusMap[dbState] || 'unknown',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Application API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

// 404 Handler for unmatched routes
app.use(notFoundHandler);

// Global Centralized Error Handler
app.use(errorHandler);

// HTTP and Socket.IO Server Setup
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin) ||
                (!isProduction && origin.startsWith("http://localhost:"))
            ) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} is not allowed by CORS`));
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.on("joinChat", (chatId) => {
        if (chatId) socket.join(String(chatId));
    });
    socket.on("joinUser", (userId) => {
        if (userId) socket.join(String(userId));
    });
    socket.on("sendMessage", (data) => {
        if (data?.chatId) {
            io.to(String(data.chatId)).emit("receiveMessage", data);
        }
        if (data?.recipientId) {
            io.to(String(data.recipientId)).emit("receiveMessage", data);
        }
    });
    socket.on("disconnect", () => {
        // Socket disconnected cleanly
    });
});

// Start Server
const serverInstance = server.listen(PORT, () => {
    console.log(`[SERVER] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful Shutdown Management
const gracefulShutdown = (signal) => {
    console.log(`[SHUTDOWN] ${signal} signal received. Closing HTTP server and connections...`);

    serverInstance.close(async () => {
        console.log('[SHUTDOWN] HTTP server closed.');

        try {
            io.close();
            console.log('[SHUTDOWN] Socket.IO server closed.');
        } catch (err) {
            console.error('[SHUTDOWN] Error closing Socket.IO:', err.message);
        }

        try {
            await disconnectDB();
        } catch (err) {
            console.error('[SHUTDOWN] Error closing MongoDB connection:', err.message);
        }

        console.log('[SHUTDOWN] Graceful shutdown completed.');
        process.exit(0);
    });

    // Force shutdown if connections do not close within 10 seconds
    setTimeout(() => {
        console.error('[SHUTDOWN] Forced shutdown after 10s timeout.');
        process.exit(1);
    }, 10000).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...', err);
    serverInstance.close(() => {
        process.exit(1);
    });
});