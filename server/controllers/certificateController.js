import Certificate from '../models/certificate.js';
import { parseExcelFile } from '../utils/excelParser.js';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// Upload Certificate Data and Store File Paths
const uploadCertificateData = async (req, res) => {
    try {
        const filePath = req.file.path;
        console.log("Uploaded file path:", filePath);

        // Parse the uploaded Excel file
        const certificates = await parseExcelFile(filePath);
        console.log("Parsed certificates:", certificates); // Log parsed certificates for debugging

        // Ensure that certificates have been parsed correctly
        if (!certificates || certificates.length === 0) {
            return res.status(400).json({ message: 'No certificates found in the uploaded file.' });
        }

        // Save certificates to the database including the file path
        const certificatesWithFilePath = certificates.map(cert => ({
            ...cert,
            filePath: filePath // Save the uploaded file path with each certificate
        }));

        await Certificate.insertMany(certificatesWithFilePath);

        // Delete the uploaded file after processing
        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'File uploaded and certificates added successfully!' });
    } catch (error) {
        console.error('Error processing the file:', error);
        res.status(500).json({ message: 'Error processing the file', error: error.message });
    }
};

// Search for a certificate by its ID
const searchCertificateById = async (req, res) => {
    try {
        console.log("Searching for certificate ID:", req.params.certificateId); // Log the ID being searched
        const certificateId = req.params.certificateId;
        const certificate = await Certificate.findOne({ certificateId: certificateId });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        res.status(200).json(certificate);
    } catch (error) {
        console.error('Error fetching certificate:', error);
        res.status(500).json({ message: 'Error fetching certificate' });
    }
};

// Function to download the certificate file
const downloadCertificate = async (req, res) => {
    try {
        const certificateId = req.params.certificateId;
        const certificate = await Certificate.findOne({ certificateId: certificateId });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=certificate_${certificateId}.pdf`);

        // Pipe the PDF document to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(25).text('Certificate of Completion', 100, 80);
        doc.fontSize(15).text(`Certificate ID: ${certificate.certificateId}`, 100, 160);
        doc.text(`Student Name: ${certificate.studentName}`, 100, 190);
        doc.text(`Course: ${certificate.course}`, 100, 220);
        doc.text(`Issue Date: ${new Date(certificate.issueDate).toLocaleDateString()}`, 100, 250);

        // Finalize the PDF and end the stream
        doc.end();

    } catch (error) {
        console.error('Error downloading certificate:', error);
        res.status(500).json({ message: 'Error downloading certificate', error: error.message });
    }
};

export { uploadCertificateData, searchCertificateById, downloadCertificate };
