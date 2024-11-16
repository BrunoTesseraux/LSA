import mongoose from "mongoose";

// Definiere das Inventory Schema
const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Exportiere das Inventory Modell
const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;