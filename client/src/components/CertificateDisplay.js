import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DisplayContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
    color: #ffffff;
`;

const Detail = styled.p`
    color: #ffffff;
`;

const DownloadButton = styled.button`
    display: inline-block;
    margin-top: 10px;
    padding: 10px;
    background: #B24592;  // Adjusted color
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #9D366E;  // Darker shade for hover effect
    }

    &:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }
`;

const CertificateDisplay = ({ certificate }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    if (!certificate) {
        return <p style={{ color: '#ffffff' }}>Loading certificate details...</p>;
    }

    const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(
            `${API_BASE_URL}/certificates/download/${certificate.certificateId}`,
            { responseType: 'blob' }
        );

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `certificate_${certificate.certificateId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    } catch (error) {
        console.error('Axios Error:', error.toJSON());
        setDownloadError(`Failed to download certificate. Please try again.`);
    } finally {
        setIsDownloading(false);
    }
};


    return (
        <DisplayContainer>
            <Title>Certificate Details</Title>
            <Detail><strong>Student Name:</strong> {certificate.studentName}</Detail>
            <Detail><strong>Certificate ID:</strong> {certificate.certificateId}</Detail>
            <Detail><strong>Course:</strong> {certificate.course}</Detail>
            <Detail><strong>Issue Date:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</Detail>
            <DownloadButton onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? 'Downloading...' : 'Download Certificate'}
            </DownloadButton>
            {downloadError && <Detail style={{ color: 'red' }}>{downloadError}</Detail>}
        </DisplayContainer>
    );
};

export default CertificateDisplay;
