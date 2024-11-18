import React from 'react';
import styled from 'styled-components';
import CertificateSearch from '../components/CertificateSearch';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StyledMain = styled.main`
    background: linear-gradient(to right, #8A2BE2, #9400D3);
    color: white;
    padding: 40px;
    min-height: calc(100vh - 200px);
    margin: 40px 20px; // Added left and right margin
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
    font-size: 2.8rem;
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #F0F8FF;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const GlassContainer = styled.div`
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
`;

const StyledCertificateSearch = styled(CertificateSearch)`
    .input {
        width: 100%;
        padding: 16px;
        margin-bottom: 20px;
        border: none;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 16px;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }

        &::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
    }

    .button {
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 25px;
        background: #4CAF50;
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: #45a049;
        }

        &:active {
            transform: scale(0.98);
        }
    }
`;


const StudentPage = () => {
    return (
        <div>
            <Header />
            <h2>Student Page</h2>
            <StyledMain>           
                <GlassContainer>
                    <Title>Find Your Certificate</Title>
                    <StyledCertificateSearch />
                </GlassContainer>
            </StyledMain>
            <Footer />
        </div>
    );
};

export default StudentPage;
