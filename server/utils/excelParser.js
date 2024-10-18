// server/utils/excelParser.js
import XLSX from 'xlsx';

export const parseExcelFile = async (filePath) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { raw: false }); // Parse sheet data into JSON

        console.log("Raw Excel Data:", data); // Log the raw Excel data for debugging

        const certificates = data.map((row) => {
            // Convert Excel date (serial number) to JavaScript Date
            let issueDate;
            if (typeof row['Issue Date'] === 'number') {
                // Convert Excel serial date to JavaScript Date
                issueDate = XLSX.SSF.parse_date_code(row['Issue Date']);
                issueDate = new Date(issueDate.y, issueDate.m - 1, issueDate.d); // Month is 0-indexed
            } else {
                // Handle cases where the date is not a number (e.g., invalid data)
                issueDate = new Date(row['Issue Date']); // Fallback if the date is a string
            }

            return {
                studentName: row['Student Name'], // Adjust based on your column names
                certificateId: row['Certificate ID'], // Adjust based on your column names
                course: row['Course'], // Adjust based on your column names
                issueDate: issueDate.toISOString() // Convert to ISO format
            };
        });

        return certificates;
    } catch (error) {
        console.error('Error parsing the Excel file:', error);
        throw new Error('Error parsing the Excel file');
    }
};
