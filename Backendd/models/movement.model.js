import mongoose from "mongoose";

// Definiere das Movement Schema
const movementSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneralInventory", required: true },
    fromLocation: { type: String, required: true }, // "General Inventory" | "Cooler <Name>" | "Bar <Name>"
    toLocation: { type: String, required: true },
    quantity: { type: Number, required: true },
    movedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Exportiere das Movement Modell
const Movement = mongoose.model("Movement", movementSchema);
export default Movement;