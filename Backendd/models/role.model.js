import mongoose from "mongoose";

// Definiere das Role Schema
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    permissions: [{
      type: String,
      required: true
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Exportiere das Role Modell
const Role = mongoose.model("Role", roleSchema);
export default Role;