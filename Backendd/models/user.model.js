import mongoose from "mongoose";
import { Schema } from "mongoose";
import Role from "./role.model.js";  // Importing the Role model
import GuestGroup from "./guestlist.model.js";  // Import the GuestGroup model

// Define the TimeTracking Schema
const timeTrackingSchema = new mongoose.Schema(
  {
    login: { type: Date, required: true },  
    logout: { type: Date },                 
  },
  {
    _id: false
  }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    resetToken: { type: String },
    timeTracking: [timeTrackingSchema],  // Array of time tracking records
    guestLists: [{  // Reference to the GuestList model
      listId: { type: mongoose.Schema.Types.ObjectId, ref: "GuestList" },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt
  }
);

// Export the User Model
const User = mongoose.model("User", userSchema);
export default User;