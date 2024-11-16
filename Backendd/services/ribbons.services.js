import Ribbon from "../models/ribbons.model.js";

// Create a new ribbon
export const createRibbon = async (data) => {
  const { color, initialQuantity, leftoverQuantity, accessTo, comment } = data;

  try {
    // Create a new ribbon document
    const newRibbon = new Ribbon({
      color,
      initialQuantity,
      leftoverQuantity, // Use leftoverQuantity as per the schema
      assignedQuantity: 0, // Default value
      handedOutQuantity: 0, // Default value
      accessTo,
      comment,
    });

    // Save the ribbon to the database
    await newRibbon.save();

    // Return the created ribbon document
    return newRibbon;
  } catch (err) {
    // Throw a specific error if something goes wrong
    throw new Error("Error creating ribbon: " + err.message);
  }
};

// Get all ribbons
export const getAllRibbons = async () => {
  try {
    return await Ribbon.find();
  } catch (err) {
    throw new Error("Error fetching ribbons");
  }
};

// Get a ribbon by its ID
export const getRibbonById = async (ribbonId) => {
  try {
    return await Ribbon.findById(ribbonId);
  } catch (err) {
    throw new Error("Error fetching ribbon");
  }
};

// Update a ribbon's details (e.g., quantity)
export const updateRibbon = async (ribbonId, data) => {
  const { totalQuantity, assignedQuantity, handedOutQuantity, comment } = data;

  try {
    const updatedRibbon = await Ribbon.findByIdAndUpdate(
      ribbonId,
      {
        totalQuantity,
        assignedQuantity,
        handedOutQuantity,
        comment,
      },
      { new: true }
    );

    return updatedRibbon;
  } catch (err) {
    throw new Error("Error updating ribbon");
  }
};

// Delete a ribbon
export const deleteRibbon = async (ribbonId) => {
  try {
    const deletedRibbon = await Ribbon.findByIdAndDelete(ribbonId);
    return deletedRibbon;
  } catch (err) {
    throw new Error("Error deleting ribbon");
  }
};