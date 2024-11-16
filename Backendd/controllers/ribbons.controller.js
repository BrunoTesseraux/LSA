import * as RibbonService from '../services/ribbons.services.js';
import * as GuestListService from '../services/guestlist.services.js'; // For guest group operations

// Ribbon Inventory Handlers
export const createRibbon = async (req, res) => {
  try {
    // Destructure data from the request body
    const { color, initialQuantity, leftoverQuantity, accessTo, comment } = req.body;
    
    // Validate that all necessary fields are provided
    if (!color || !initialQuantity || !leftoverQuantity || !accessTo) {
      return res.status(400).json({
        message: 'Missing required fields',
        error: 'Please provide color, initialQuantity, leftoverQuantity, and accessTo'
      });
    }

    // Pass data to the service to create the ribbon
    const ribbon = await RibbonService.createRibbon({
      color,
      initialQuantity,
      leftoverQuantity,
      accessTo,
      comment
    });

    // Return success response
    res.status(201).json({ message: 'Ribbon created successfully', ribbon });
  } catch (err) {
    // Return error response
    res.status(500).json({ message: 'Error creating ribbon', error: err.message });
  }
};

export const getAllRibbons = async (req, res) => {
  try {
    const ribbons = await RibbonService.getAllRibbons();
    res.status(200).json(ribbons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ribbons', error: err.message });
  }
};

export const getRibbonById = async (req, res) => {
  try {
    const ribbon = await RibbonService.getRibbonById(req.params.ribbonId);
    if (!ribbon) {
      return res.status(404).json({ message: 'Ribbon not found' });
    }
    res.status(200).json(ribbon);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ribbon', error: err.message });
  }
};

export const updateRibbon = async (req, res) => {
  try {
    const updatedRibbon = await RibbonService.updateRibbon(req.params.ribbonId, req.body);
    res.status(200).json({ message: 'Ribbon updated successfully', ribbon: updatedRibbon });
  } catch (err) {
    res.status(500).json({ message: 'Error updating ribbon', error: err.message });
  }
};

export const deleteRibbon = async (req, res) => {
  try {
    const deletedRibbon = await RibbonService.deleteRibbon(req.params.ribbonId);
    if (!deletedRibbon) {
      return res.status(404).json({ message: 'Ribbon not found' });
    }
    res.status(200).json({ message: 'Ribbon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ribbon', error: err.message });
  }
};

// Guest Group Ribbon Handlers
export const assignRibbonToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { ribbonId, quantityAssigned } = req.body;

    const updatedGroup = await GuestListService.assignRibbonToGroup(groupId, ribbonId, quantityAssigned);
    res.status(201).json({ message: 'Ribbon assigned to group', guestGroup: updatedGroup });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning ribbon', error: err.message });
  }
};

export const updateAssignedRibbon = async (req, res) => {
  try {
    const { groupId, ribbonId } = req.params;
    const { quantityAssigned } = req.body;

    const updatedGroup = await GuestListService.updateAssignedRibbon(groupId, ribbonId, quantityAssigned);
    res.status(200).json({ message: 'Assigned ribbon updated', guestGroup: updatedGroup });
  } catch (err) {
    res.status(500).json({ message: 'Error updating assigned ribbon', error: err.message });
  }
};

export const removeAssignedRibbon = async (req, res) => {
  try {
    const { groupId, ribbonId } = req.params;

    const updatedGroup = await GuestListService.removeAssignedRibbon(groupId, ribbonId);
    res.status(200).json({ message: 'Assigned ribbon removed', guestGroup: updatedGroup });
  } catch (err) {
    res.status(500).json({ message: 'Error removing assigned ribbon', error: err.message });
  }
};