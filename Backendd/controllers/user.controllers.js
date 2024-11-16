import {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
  } from '../services/user.services.js';
  
  // Controller to get all users
  export const getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsersService();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const createUser = async (req, res) => {
    const { username, password, roles, dateOfBirth, email, profilePicture } = req.body;
  
    // Basic validation (you can extend this)
    if (!username || !password || !dateOfBirth || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      // Call the service to create the user
      const newUser = await createUserService({
        username,
        password,  // Just send the password here
        roles,
        dateOfBirth,
        email,
        profilePicture,
      });
  
      // Send back the response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to get a user by ID
  export const getUserById = async (req, res) => {
    try {
      const user = await getUserByIdService(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  // Controller to update a user
  export const updateUser = async (req, res) => {
    try {
      const updatedUser = await updateUserService(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update user failed:", error); // Add this for detailed logging

      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to delete a user
  export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await deleteUserService(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const { user, token } = await loginUserService(username, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };