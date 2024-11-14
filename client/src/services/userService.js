// src/services/userService.js
import axios from 'axios';

// Use the API URL from environment variables or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register a new user
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: {
            'Content-Type': 'application/json', // Ensure the content type is set
        },
    });
    return response.data;
};

// Login a user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData, {
        headers: {
            'Content-Type': 'application/json', // Ensure the content type is set
        },
    });
    return response.data;
};

// Register a user with type
const registerWithType = async (username, password, type) => {
    const userData = { username, password, type }; // Include type
    return await register(userData);
};

// Combine all user service functions into one object
const userService = {
    register,
    login,
    registerWithType,
};

export default userService;
