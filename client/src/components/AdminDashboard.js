// client/src/components/AdminDashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import certificateService from '../services/certificateService';
import certificateImage4 from '../assets/certificateImage4.png';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(52, 152, 219, 0.3);
  }
`;

const UploadButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin-top: 1.5rem;
  background-color: ${props => props.disabled ? '#95a5a6' : '#2ecc71'};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 6px rgba(46, 204, 113, 0.2)'};

  &:hover {
    background-color: ${props => props.disabled ? '#95a5a6' : '#27ae60'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 6px 8px rgba(46, 204, 113, 0.3)'};
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  padding: 12px;
  border-radius: 8px;
  color: ${props => props.success ? '#27ae60' : '#c0392b'};
  background-color: ${props => props.success ? '#e8f8f5' : '#fadbd8'};
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageBackground = styled.div`
  background: linear-gradient(135deg, #8e44ad, #ff69b4);
  min-height: 100vh;
  padding: 3rem 0;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

const CertificateImage = styled.img`
  width: 40%;
  height: 10%;
  margin: 20px auto;
  display: flex;
  border-radius: 10px;
`;

const AdminDashboard = () => {
    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setFile(selectedFile);
            setErrorMessage(null);
        } else {
            setErrorMessage("Please upload a valid Excel file.");
        }
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            setIsLoading(true);
            try {
                await certificateService.uploadCertificateData(formData);
                setUploadSuccess(true);
                setFile(null);
                setErrorMessage(null); // Clear previous error
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Error uploading file. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrorMessage("Please select a file to upload.");
        }
    };

    return (
        <PageBackground>
            <DashboardContainer>
                <Title>Admin Dashboard</Title>
                <CertificateImage src={certificateImage4} alt="Certificate Example" />
                <FileInput type="file" id="file" onChange={handleFileChange} />
                <FileInputLabel htmlFor="file">
                    <FaUpload /> {file ? file.name : 'Choose a file'}
                </FileInputLabel>
                <UploadButton onClick={handleUpload} disabled={isLoading || !file}>
                    {isLoading ? "Uploading..." : "Upload Certificate Data"}
                </UploadButton>
                {uploadSuccess && (
                    <Message success>
                        <FaCheckCircle /> File uploaded successfully!
                    </Message>
                )}
                {errorMessage && (
                    <Message>
                        <FaExclamationCircle /> {errorMessage}
                    </Message>
                )}
            </DashboardContainer>
        </PageBackground>
    );
};

export default AdminDashboard;