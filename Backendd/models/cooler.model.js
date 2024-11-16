import mongoose from "mongoose";

// Definiere das Cooler Schema
const coolerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    inventory: [
      {
        inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneralInventory", required: true },
        quantity: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

// Exportiere das Cooler Modell
const Cooler = mongoose.model("Cooler", coolerSchema);
export default Cooler;