// server/app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import certificateRoutes from './routes/certificateRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware (Ensure both local and production URLs are included)
app.use(cors({
    origin: ['http://localhost:3000', 'https://certificate-verfication-00.netlify.app'], // Include both local and production URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers for CORS
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Handle preflight requests (very important for CORS with methods like POST)
app.options('*', cors());

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes for certificates and users
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
