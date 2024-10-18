import express from 'express';
import multer from 'multer';
import { uploadCertificateData, searchCertificateById, downloadCertificate } from '../controllers/certificateController.js';
import path from 'path';


// Multer setup: Save files temporarily to the 'uploads' directory
const upload = multer({
    dest: 'uploads/', 
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb(null, true);
        } else {
            cb(new Error('Only Excel files are allowed!'), false);
        }
    },
});

const router = express.Router();

// Define upload route
router.post('/upload', upload.single('file'), uploadCertificateData);

// Define search route for certificates by Certificate ID
router.get('/search/:certificateId', searchCertificateById);

// Define download route for certificates
router.get('/download/:certificateId', downloadCertificate);

export default router;
