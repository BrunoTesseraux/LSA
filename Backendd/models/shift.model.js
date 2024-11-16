import mongoose from "mongoose";

// Definiere das Shift Schema
const shiftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },
    shiftStart: {
      type: Date,
      required: true
    },
    shiftEnd: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Exportiere das Shift Modell
const Shift = mongoose.model("Shift", shiftSchema);
export default Shift;