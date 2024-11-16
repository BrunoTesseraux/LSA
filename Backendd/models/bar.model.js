import mongoose from "mongoose";

// Definiere das Bar Schema
const barSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    inventory: [
      {
        inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "CoolerInventory", required: true },
        quantity: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);


// Exportiere das Bar Modell
const Bar = mongoose.model("Bar", barSchema);
export default Bar;