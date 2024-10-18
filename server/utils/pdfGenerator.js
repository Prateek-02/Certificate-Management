import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDF = (data) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = 'output.pdf';
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);
        doc.text(data);
        doc.end();

        writeStream.on('finish', () => {
            resolve(filePath);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
};