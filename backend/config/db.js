import mongoose from 'mongoose';

export const connectDB = async () => {
    // await mongoose.connect("mongodb://127.0.0.1:27017/RealEstate")
    // .then(()=>console.log("DB Connected"));
    await mongoose.connect("mongodb+srv://suryareja2005_db_user:uaj7YgMxxb8PqEnA@cluster0.btzhgdz.mongodb.net/RealEstate")
        .then(() => console.log("DB Connected"));
}