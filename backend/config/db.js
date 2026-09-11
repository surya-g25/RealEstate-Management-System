import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI?.trim();

    if (!uri) {
        console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB Atlas Connected Successfully");
    } catch (error) {
        console.error("MongoDB Atlas Connection Error:", error.message);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed gracefully.");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error.message);
    }
};

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB error:", err.message);
});