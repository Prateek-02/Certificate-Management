import React, { useState } from 'react';
import styled from 'styled-components';
import certificateService from '../services/certificateService';
import CertificateDisplay from './CertificateDisplay';
import certificateImage3 from '../assets/certificateImage3.png';

const SearchContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 90%;
    font-size: 20px;
    padding: 20px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    color: black;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
`;

const Button = styled.button`
    width: 80%;
    padding: 20px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background: #B24592;  // Changed to a mix of purple and pink
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #9D366E;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
`;

const ErrorMessage = styled.p`
    color: #ff6b6b;
    text-align: center;
    margin-top: 10px;
    font-size: 20px;
`;

const CertificateImage = styled.img`
    width: 95%;
    height: 500px;
    margin: 20px 0;
    border-radius: 10px;
`;

const CertificateSearch = () => {
    const [certificateId, setCertificateId] = useState('');
    const [certificate, setCertificate] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        console.log("Searching for:", certificateId);
        if (!certificateId) {
            setError('Please enter a Certificate ID');
            return;
        }

        try {
            const result = await certificateService.getCertificateById(certificateId);
            console.log("Certificate found:", result);
            setCertificate(result);
            setError(null);
        } catch (error) {
            console.error("Error fetching certificate:", error);
            setCertificate(null);
            setError('Certificate not found');
        }
    };

    return (
        <SearchContainer>
            <Title>Search for your Certificate</Title>
            <CertificateImage src={certificateImage3} alt="Certificate Sample" />
            <Input 
                type="text" 
                placeholder="Enter Certificate ID" 
                value={certificateId} 
                onChange={(e) => setCertificateId(e.target.value)} 
            />
            <Button onClick={handleSearch}>Search</Button>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {certificate && <CertificateDisplay certificate={certificate} />}
        </SearchContainer>
    );
};

export default CertificateSearch;
