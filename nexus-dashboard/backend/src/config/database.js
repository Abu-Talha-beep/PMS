import mongoose from "mongoose";
// import {DB_NAME} from '../constants.js';
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async () => {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected successfully , Host");
    } catch (error) {
        console.log("error",error);
        process.exit(1);
    }
}