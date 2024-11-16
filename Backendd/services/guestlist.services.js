import GuestList from "../models/guestlist.model.js";
import Ribbon from "../models/ribbons.model.js";

// Create a new guest list
export const createGuestList = async (name, ribbons) => {
  try {
    const assignedRibbons = [];

    // Check each ribbon and update the assigned quantity
    for (let { ribbonId, quantityAssigned } of ribbons) {
      const ribbon = await Ribbon.findById(ribbonId);
      if (!ribbon) {
        throw new Error(`Ribbon with ID ${ribbonId} not found`);
      }

      // Ensure enough ribbons are available in the inventory
      if (ribbon.leftoverQuantity < quantityAssigned) {
        throw new Error(`Not enough ribbons of color ${ribbon.color}. Available: ${ribbon.leftoverQuantity}, Required: ${quantityAssigned}`);
      }

      ribbon.leftoverQuantity -= quantityAssigned;  // Subtract from inventory
      await ribbon.save();  // Save the updated ribbon

      // Push the ribbon and assigned quantity into the assignedRibbons array
      assignedRibbons.push({ ribbon: ribbonId, quantityAssigned });
    }

    // Create a new guest list with the assigned ribbons
    const newGuestList = new GuestList({
      name,
      ribbons: assignedRibbons,
    });

    await newGuestList.save();  // Save the new guest list

    return newGuestList;  // Return the created guest list
  } catch (err) {
    throw new Error("Error creating guest list: " + err.message);
  }
};

// Get all guest lists
export const getAllGuestLists = async () => {
  try {
    // Fetch the guest lists with populated ribbon details
    const guestLists = await GuestList.find().populate("ribbons.ribbon");

    // Format the result to return only specific fields
    const formattedGuestLists = guestLists.map((guestList) => ({
      _id: guestList._id,
      name: guestList.name,
      ribbons: guestList.ribbons.map((ribbonAssignment) => ({
        ribbon: {
          _id: ribbonAssignment.ribbon._id,
          color: ribbonAssignment.ribbon.color,
          accessTo: ribbonAssignment.ribbon.accessTo,
          comment: ribbonAssignment.ribbon.comment,
          __v: ribbonAssignment.ribbon.__v,
        },
        quantityAssigned: ribbonAssignment.quantityAssigned
      }))
    }));

    return formattedGuestLists;  // Return the formatted guest lists
  } catch (err) {
    throw new Error("Error fetching guest lists: " + err.message);
  }
};

// Get a guest list by ID
export const getGuestListById = async (listId) => {
  try {
    return await GuestList.findById(listId).populate("ribbons.ribbon");
  } catch (err) {
    throw new Error("Error fetching guest list");
  }
};

// Update a guest list (add more ribbons or update quantities)
export const updateGuestList = async (listId, ribbons) => {
  try {
    const updatedGuestList = await GuestList.findById(listId);
    if (!updatedGuestList) {
      throw new Error("Guest list not found");
    }

    // Loop through the ribbons to update quantities or remove ribbons if quantity is 0
    for (let { ribbonId, quantityAssigned } of ribbons) {
      const ribbon = await Ribbon.findById(ribbonId);
      if (!ribbon) {
        throw new Error(`Ribbon with ID ${ribbonId} not found`);
      }

      // Ensure enough ribbons are available in the inventory when adding new ribbons
      if (ribbon.leftoverQuantity < quantityAssigned && quantityAssigned > 0) {
        throw new Error(`Not enough ribbons of color ${ribbon.color}`);
      }

      // Find if the ribbon already exists in the guest list
      const existingRibbonIndex = updatedGuestList.ribbons.findIndex(r => r.ribbon.toString() === ribbonId);

      if (existingRibbonIndex !== -1) {
        // If the ribbon already exists, update the quantity
        const oldQuantity = updatedGuestList.ribbons[existingRibbonIndex].quantityAssigned;
        
        // If the quantity is 0, remove the ribbon from the guest list
        if (quantityAssigned === 0) {
          // Add the old quantity back to the ribbon inventory
          ribbon.leftoverQuantity += oldQuantity;
          // Remove the ribbon from the guest list
          updatedGuestList.ribbons.splice(existingRibbonIndex, 1);
        } else {
          // Re-add the old quantity to the inventory
          ribbon.leftoverQuantity += oldQuantity;
          // Subtract the new quantity from the inventory
          ribbon.leftoverQuantity -= quantityAssigned;
          
          // Update the guest list with the new quantity
          updatedGuestList.ribbons[existingRibbonIndex].quantityAssigned = quantityAssigned;
        }
      } else {
        // If the ribbon doesn't exist in the guest list and quantity is greater than 0, add it
        if (quantityAssigned > 0) {
          updatedGuestList.ribbons.push({ ribbon: ribbonId, quantityAssigned });
          // Subtract the assigned quantity from the ribbon inventory
          ribbon.leftoverQuantity -= quantityAssigned;
        }
      }

      // Save the updated ribbon inventory
      await ribbon.save();
    }

    // Save the updated guest list
    await updatedGuestList.save();
    return updatedGuestList;
  } catch (err) {
    throw new Error("Error updating guest list: " + err.message);
  }
};

// Delete a guest list
export const deleteGuestList = async (listId) => {
  try {
    // Fetch the guest list to be deleted and get ribbons with quantities
    const guestListToDelete = await GuestList.findById(listId);

    if (!guestListToDelete) {
      throw new Error("Guest list not found");
    }

    // Loop over each ribbon in the guest list and re-add it to inventory
    for (let { ribbon, quantityAssigned } of guestListToDelete.ribbons) {
      const ribbonInInventory = await Ribbon.findById(ribbon);

      if (!ribbonInInventory) {
        throw new Error(`Ribbon with ID ${ribbon} not found`);
      }

      // Ensure quantityAssigned is a number
      const quantity = Number(quantityAssigned);
      if (isNaN(quantity)) {
        throw new Error(`Invalid quantityAssigned for ribbon ${ribbon}: ${quantityAssigned}`);
      }

      // Re-add the assigned ribbons back to inventory
      ribbonInInventory.leftoverQuantity = ribbonInInventory.leftoverQuantity + quantity;

      // Log the updated quantity for debugging
      console.log(`Ribbon ID ${ribbon}: Updated leftoverQuantity is ${ribbonInInventory.leftoverQuantity}`);

      // Save the updated ribbon inventory
      const savedRibbon = await ribbonInInventory.save();

      if (!savedRibbon) {
        throw new Error(`Failed to update ribbon with ID ${ribbon}`);
      }
    }

    // Now delete the guest list after handling the ribbons
    const deletedGuestList = await GuestList.findByIdAndDelete(listId);

    if (!deletedGuestList) {
      throw new Error("Error deleting guest list");
    }

    return deletedGuestList;
  } catch (err) {
    console.error("Error during deletion:", err);
    throw new Error("Error deleting guest list: " + err.message);
  }
};

export const assignRibbonToGroup = async (groupId, ribbonId, quantityAssigned) => {
  const guestGroup = await GuestList.findById(groupId);
  const ribbon = await Ribbon.findById(ribbonId);

  if (!guestGroup || !ribbon) {
    throw new Error('Guest group or ribbon not found');
  }

  if (ribbon.totalQuantity < quantityAssigned) {
    throw new Error(`Not enough ${ribbon.color} ribbons available`);
  }

  // Update inventory and guest group
  ribbon.totalQuantity -= quantityAssigned;
  guestGroup.ribbons.push({ ribbon: ribbonId, quantityAssigned });

  await ribbon.save();
  await guestGroup.save();
  return guestGroup;
};

// Update assigned ribbon quantity
export const updateAssignedRibbon = async (groupId, ribbonId, newQuantityAssigned) => {
  const guestGroup = await GuestList.findById(groupId);
  if (!guestGroup) {
    throw new Error('Guest group not found');
  }

  const ribbonEntry = guestGroup.ribbons.find(r => r.ribbon.toString() === ribbonId);
  if (!ribbonEntry) {
    throw new Error('Ribbon assignment not found in guest group');
  }

  const ribbon = await Ribbon.findById(ribbonId);
  const quantityChange = newQuantityAssigned - ribbonEntry.quantityAssigned;

  if (ribbon.totalQuantity < quantityChange) {
    throw new Error('Not enough ribbons available for the change');
  }

  ribbon.totalQuantity -= quantityChange;
  ribbonEntry.quantityAssigned = newQuantityAssigned;

  await ribbon.save();
  await guestGroup.save();
  return guestGroup;
};

// Remove an assigned ribbon from a guest group
export const removeAssignedRibbon = async (groupId, ribbonId) => {
  const guestGroup = await GuestList.findById(groupId);
  const ribbon = await Ribbon.findById(ribbonId);

  if (!guestGroup || !ribbon) {
    throw new Error('Guest group or ribbon not found');
  }

  const ribbonEntry = guestGroup.ribbons.find(r => r.ribbon.toString() === ribbonId);
  if (!ribbonEntry) {
    throw new Error('Ribbon assignment not found in guest group');
  }

  ribbon.totalQuantity += ribbonEntry.quantityAssigned;
  guestGroup.ribbons = guestGroup.ribbons.filter(r => r.ribbon.toString() !== ribbonId);

  await ribbon.save();
  await guestGroup.save();
  return guestGroup;
};