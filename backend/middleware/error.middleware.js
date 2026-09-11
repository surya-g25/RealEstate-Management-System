// 404 Not Found handler
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource not found: ${req.method} ${req.originalUrl}`
    });
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === "production";
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";

    // Handle CORS error
    if (err.message && err.message.includes("Not allowed by CORS")) {
        statusCode = 403;
        message = "Origin blocked by CORS policy";
    }

    // Handle Multer file upload errors
    if (err.code === "LIMIT_FILE_SIZE") {
        statusCode = 400;
        message = "File size exceeds the 5MB limit.";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        statusCode = 400;
        message = "Too many files uploaded or unexpected field name.";
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid format for resource identifier: ${err.value}`;
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid authentication token";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Authentication token has expired";
    }

    // Log the error in server logs
    if (!isProduction || statusCode >= 500) {
        console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${statusCode}: ${err.message}`);
        if (err.stack && !isProduction) {
            console.error(err.stack);
        }
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(isProduction ? {} : { stack: err.stack })
    });
};
