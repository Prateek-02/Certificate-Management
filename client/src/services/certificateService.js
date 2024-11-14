// client/src/services/certificateService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const uploadCertificateData = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/certificates/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCertificateById = async (certificateId) => {
    try {
        const response = await axios.get(`${API_URL}/certificates/search/${certificateId}`);
        return response.data; // Assuming the response contains the certificate data
    } catch (error) {
        throw error; // Throw error to be caught in CertificateSearch
    }
};

const certificateService = {
    uploadCertificateData,
    getCertificateById, // Ensure this function is correctly defined and exported
};

export default certificateService;
