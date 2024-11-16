import mongoose from "mongoose";

// Ribbon Schema
const ribbonSchema = new mongoose.Schema({
    color: { type: String, required: true }, // Color of the ribbon
    initialQuantity: { type: Number, required: true }, // Initial number of ribbons in the inventory
    leftoverQuantity: { type: Number, required: true }, // Total quantity available (inventory)
    assignedQuantity: { type: Number, default: 0 }, // Quantity assigned to guest groups
    handedOutQuantity: { type: Number, default: 0 }, // Quantity actually handed out to guests
    accessTo: { type: String, required: true }, // Who can access this ribbon (VIP, Guest, etc.)
    comment: { type: String }, // Optional comment for additional information
}, { timestamps: true });

const Ribbon = mongoose.model("Ribbon", ribbonSchema);
export default Ribbon;