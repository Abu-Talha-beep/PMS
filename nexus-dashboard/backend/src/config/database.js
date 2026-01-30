import mongoose from "mongoose";

const connection = {};

async function connectDB() {
  console.log("Inside Mongo Connection");

  if (connection.isConnected) {
    console.log("DB already connected");
    return;
  }
  
  try {
    console.log(process.env.MONGODB_URI);

    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Error occurred while connecting to MongoDB", error);
    process.exit(1);
  }
}

export default connectDB;
