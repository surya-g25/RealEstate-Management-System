import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb+srv://suryareja2005_db_user:uaj7YgMxxb8PqEnA@cluster0.btzhgdz.mongodb.net/RealEstate";
        await mongoose.connect(uri);
        console.log("MongoDB Atlas Connected Successfully");
    } catch (error) {
        console.error("MongoDB Atlas Connection Error:", error.message);
    }
};

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Reconnecting...");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB error:", err.message);
});