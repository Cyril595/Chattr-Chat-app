import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("db connected");
    } catch (error) {
        console.log("error connecting db",error);
    }
};

export default db;
