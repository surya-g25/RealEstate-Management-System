import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import inquiryRouter from './routes/inquiry.routes.js';
import wishlistRouter from "./routes/wishlist.routes.js"
import contactRouter from './routes/contact.routes.js';
import adminRouter from './routes/admin.routes.js';
import chatRouter from './routes/chat.routes.js';
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8000;

// DB
connectDB();

// MIDLLEWARES
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    },
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
        // do nothing
    });
})


server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})