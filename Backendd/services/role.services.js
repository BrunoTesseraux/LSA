import Role from '../models/role.model.js';

// Service to get all roles
export const getAllRolesService = async () => {
  try {
    return await Role.find();
  } catch (error) {
    throw new Error('Error fetching roles: ' + error.message);
  }
};

// Service to get a role by ID
export const getRoleByIdService = async (id) => {
  try {
    const role = await Role.findById(id);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error('Error fetching role: ' + error.message);
  }
};

// Service to create a new role
export const createRoleService = async (roleData) => {
  try {
    const newRole = new Role(roleData);
    return await newRole.save();
  } catch (error) {
    throw new Error('Error creating role: ' + error.message);
  }
};

// Service to update a role by ID
export const updateRoleService = async (id, updateData) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRole) {
      throw new Error('Role not found');
    }
    return updatedRole;
  } catch (error) {
    throw new Error('Error updating role: ' + error.message);
  }
};

// Service to delete a role by ID
export const deleteRoleService = async (id) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      throw new Error('Role not found');
    }
    return deletedRole;
  } catch (error) {
    throw new Error('Error deleting role: ' + error.message);
  }
};