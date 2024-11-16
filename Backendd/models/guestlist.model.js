import mongoose from "mongoose";

const guestListSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    ribbons: [
      {
        ribbon: {
          type: mongoose.Schema.Types.ObjectId, // Refers to Ribbon's ObjectId
          ref: "Ribbon", // Reference to the Ribbon model
          required: true
        },
        quantityAssigned: { 
          type: Number, 
          required: true 
        } // The number of ribbons assigned to this group
      }
    ]
  },
  { timestamps: true }
);

const GuestList = mongoose.model("GuestList", guestListSchema);
export default GuestList;