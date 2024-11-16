import * as GuestListService from "../services/guestlist.services.js";

// Create a new guest list
export const createGuestList = async (req, res) => {
  const { name, ribbons } = req.body;

  // Input validation
  if (!name || !ribbons || ribbons.length === 0) {
    return res.status(400).json({ message: 'Name and at least one ribbon are required.' });
  }

  try {
    // Call the service to create the guest list
    const newGuestList = await GuestListService.createGuestList(name, ribbons);
    res.status(201).json({ message: "Guest list created successfully", guestList: newGuestList });
  } catch (err) {
    res.status(500).json({ message: "Error creating guest list", error: err.message });
  }
};

// Get all guest lists
export const getAllGuestLists = async (req, res) => {
  try {
    const guestLists = await GuestListService.getAllGuestLists();
    res.status(200).json(guestLists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching guest lists", error: err.message });
  }
};

// Get a guest list by ID
export const getGuestListById = async (req, res) => {
  try {
    const guestList = await GuestListService.getGuestListById(req.params.id);
    if (!guestList) {
      return res.status(404).json({ message: "Guest list not found" });
    }
    res.status(200).json(guestList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching guest list", error: err.message });
  }
};

// Update a guest list
export const updateGuestList = async (req, res) => {
  const { ribbons } = req.body;

  try {
    const updatedGuestList = await GuestListService.updateGuestList(req.params.id, ribbons);
    res.status(200).json({ message: "Guest list updated successfully", guestList: updatedGuestList });
  } catch (err) {
    res.status(500).json({ message: "Error updating guest list", error: err.message });
  }
};

// Delete a guest list
export const deleteGuestList = async (req, res) => {
  try {
    const deletedGuestList = await GuestListService.deleteGuestList(req.params.id);
    if (!deletedGuestList) {
      return res.status(404).json({ message: "Guest list not found" });
    }
    res.status(200).json({ message: "Guest list deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting guest list", error: err.message });
  }
};