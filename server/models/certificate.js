// server/models/certificate.js
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    certificateId: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    issueDate: { type: Date, required: true },
    filePath: { type: String, required: true } // New field to store the file path
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
