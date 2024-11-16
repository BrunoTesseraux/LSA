import express from 'express';
import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from './../controllers/role.controler.js';

const router = express.Router();

// GET all roles
router.get('/', getAllRoles);

// GET role by ID
router.get('/:id', getRoleById);

// POST create a new role
router.post('/', createRole);

// PUT update a role by ID
router.put('/:id', updateRole);

// DELETE role by ID
router.delete('/:id', deleteRole);

export default router;