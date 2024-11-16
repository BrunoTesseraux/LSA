import express from 'express';
import * as RibbonController from '../controllers/ribbons.controller.js';

const router = express.Router();

// Routes for Ribbon Inventory
router.post('/inventory', RibbonController.createRibbon); // Create a new ribbon in inventory
router.get('/inventory', RibbonController.getAllRibbons); // Get all ribbons in inventory
router.get('/inventory/:ribbonId', RibbonController.getRibbonById); // Get a single ribbon by ID
router.put('/inventory/:ribbonId', RibbonController.updateRibbon); // Update ribbon details in inventory
router.delete('/inventory/:ribbonId', RibbonController.deleteRibbon); // Delete a ribbon from inventory

// Routes for Guest Group Ribbons
router.post('/guestgroups/:groupId/ribbons', RibbonController.assignRibbonToGroup); // Assign a ribbon to a guest group
router.put('/guestgroups/:groupId/ribbons/:ribbonId', RibbonController.updateAssignedRibbon); // Update assigned ribbon for a guest group
router.delete('/guestgroups/:groupId/ribbons/:ribbonId', RibbonController.removeAssignedRibbon); // Remove assigned ribbon from a guest group

export default router;