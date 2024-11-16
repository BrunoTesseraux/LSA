import express from 'express';
import * as GuestListController from '../controllers/guestlist.controllers.js';

const router = express.Router();

router.get('/', GuestListController.getAllGuestLists);
router.get('/:id', GuestListController.getGuestListById);
router.post('/', GuestListController.createGuestList);
router.put('/:id', GuestListController.updateGuestList);
router.delete('/:id', GuestListController.deleteGuestList);

export default router;