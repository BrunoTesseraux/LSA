import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import GuestList from './../models/guestlist.model.js'; 
import bcrypt from 'bcryptjs';

// Service to get all users with roles populated
export const getAllUsersService = async () => {
  return await User.find().populate('roles');
};

// Service to get a user by ID with roles populated
export const getUserByIdService = async (id) => {
  return await User.findById(id).populate('roles');
};

// Service to create a new user with role validation
export const createUserService = async (userData) => {
  const { roles, password, dateOfBirth, email, profilePicture, username } = userData;

  // Validate password length
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Create a salt with 10 rounds of hashing
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

  // Prepare the user data for saving
  const userToSave = {
    username,
    passwordHash: hashedPassword,  // Use hashed password for storage
    roles,
    dateOfBirth,
    email,
    profilePicture,
  };

  // Validate roles
  if (roles && roles.length) {
    const validRoles = await Role.find({ _id: { $in: roles } });
    if (validRoles.length !== roles.length) {
      throw new Error('One or more roles are invalid');
    }
  }

  // Create the user
  const newUser = new User(userToSave);
  return await newUser.save();
};

// Service to update a user with role validation
export const updateUserService = async (id, updateData) => {
  const { roles, guestListId } = updateData;

  // Validate roles if provided
  if (roles) {
    const validRoles = await Role.find({ _id: { $in: roles } });
    if (validRoles.length !== roles.length) {
      throw new Error('One or more roles are invalid');
    }
  }

  // Find the user by ID
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Handle guest list assignment
  if (guestListId) {
    const guestList = await GuestList.findById(guestListId);
    if (!guestList) {
      throw new Error('Guest list not found');
    }

    const alreadyAssigned = user.guestLists.some(
      list => list.listId.toString() === guestListId
    );

    if (!alreadyAssigned) {
      user.guestLists.push({ listId: guestListId });
    } else {
      throw new Error('User is already assigned to this guest list');
    }
  }

  // Update other fields (e.g., roles) using spread operator
  Object.assign(user, updateData);

  // Save the user (without populate) and then populate afterward
  await user.save();

  // Populate roles and guestLists separately and return the populated user
  await user.populate('roles');  // Populate roles first
  await user.populate('guestLists.listId'); // Then populate guestLists

  return user; // Return the populated user
};


// Service to delete a user
export const deleteUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};