import { loginUserService } from '../services/auth.services.js';
// import { createUserService } from '../services/auth.services.js';


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
    const { user, token } = await loginUserService(username, password);
    res.status(200).json({ user, token }); // Send the user and token as response
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

// export const createUser = async (req, res) => {
// const { username, passwordHash, roles, dateOfBirth, email, profilePicture } = req.body;

// try {
//     const newUser = await createUserService({
//     username, 
//     passwordHash, 
//     roles, 
//     dateOfBirth, 
//     email, 
//     profilePicture
//     });
//     res.status(201).json(newUser);
// } catch (error) {
//     res.status(400).json({ error: error.message });
// }
// };