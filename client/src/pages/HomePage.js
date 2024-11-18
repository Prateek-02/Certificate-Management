import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import certificateImage from '../assets/certificateImage.png';
import certificateImage2 from '../assets/certificateImage2.png';

const StyledMain = styled.main`
    background: linear-gradient(to right, #8A2BE2, #9400D3);
    color: white;
    padding: 40px;
    min-height: calc(100vh - 200px); // Adjust based on your header and footer height
    margin: 40px 20px; // Added left and right margin
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align: center;
`;

const Description = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: center;
`;

const GetStartedSection = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GetStartedTitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 15px;
    text-align: center;
`;

const StyledButton = styled(Link)`
    display: block;
    padding: 12px 24px;
    margin: 0 auto;
    background-color: white;
    color: #8A2BE2;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #f3f3f3;
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const CertificateImage = styled.img`
    width: 50%;
    height: 40%;
    margin: 20px 0;
    border-radius: 10px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
`;

const HomePage = () => {
    return (
        <div>
            <Header />
            <StyledMain>
                <Title>Welcome to the Certificate Verification System</Title>
                <Description>
                    This system allows educational institutions to upload student certificates and lets students search and download their certificates.
                </Description>
                <Description>
                    Admins can use the Admin Dashboard to upload certificates in bulk via Excel files, while students can search for their certificates using a unique ID.
                </Description>
                <GetStartedSection>
                    <GetStartedTitle>Get Started</GetStartedTitle>
                    <ImageContainer>
                        <CertificateImage src={certificateImage2} alt="Certificate Image 2" />
                        <CertificateImage src={certificateImage} alt="Certificate Image" />
                    </ImageContainer>
                    <StyledButton to="/register">Register</StyledButton>
                </GetStartedSection>
            </StyledMain>
            <Footer />
        </div>
    );
};

export default HomePage;
