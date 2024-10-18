// server/controllers/userController.js
import User from '../models/User.js';

// Register a new user
export const registerUser = async (req, res) => {
    const { username, password, type } = req.body; // Include type in the request
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance without hashing the password
        const newUser = new User({ username, password, type }); // Set user type

        // Save the user to the database
        await newUser.save();

        // Respond with success message and user type
        res.status(201).json({
            message: 'User registered successfully',
            userType: newUser.type, // Return the user type upon registration
        });
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            userType: user.type,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
