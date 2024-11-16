import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, createUser } from './../controllers/user.controllers.js';


const router = express.Router(); 

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);


export default router;