import { 
    createRoleService,
    getAllRolesService,
    getRoleByIdService,
    updateRoleService,
    deleteRoleService
  } from '../services/role.services.js';
  
  // Controller to get all roles
  export const getAllRoles = async (req, res) => {
    try {
      const roles = await getAllRolesService();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to get a role by ID
  export const getRoleById = async (req, res) => {
    try {
      const role = await getRoleByIdService(req.params.id);
      res.status(200).json(role);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Controller to create a new role
  export const createRole = async (req, res) => {
    try {
      const { name, description, permissions } = req.body;
      const newRole = await createRoleService({ name, description, permissions });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to update a role by ID
  export const updateRole = async (req, res) => {
    try {
      const updatedRole = await updateRoleService(req.params.id, req.body);
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Controller to delete a role by ID
  export const deleteRole = async (req, res) => {
    try {
      await deleteRoleService(req.params.id);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };