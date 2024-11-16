import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectToDB = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
};