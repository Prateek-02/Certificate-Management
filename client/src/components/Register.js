// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userService from '../services/userService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PageBackground = styled.div`
    background: linear-gradient(135deg, #8A2BE2 0%, #9100D3 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    margin: 20px 20px; // Added margin
    border-radius: 10px;
`;

const Container = styled.div`
    max-width: 500px;
    width: 100%;
    padding: 40px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    min-height: 400px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-size: 28px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 25px;
    border: none;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        transform: scale(1.02);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
`;

const Button = styled.button`
    padding: 15px;
    background-color: #8A2BE2;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #6f21b0;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
`;

const RadioGroup = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
    color: #f44336;
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
`;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student'); // Default type
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Use registerWithType to register with the user type
            await userService.registerWithType(username, password, userType); 
            navigate('/login'); // Redirect after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'Error registering'); // Set the error message
        }
    };
    
    return (
        <div>
            <Header />
            <PageBackground>
                <Container>
                    <Title>Create Your Account</Title>
                    {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message */}
                    <Form onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username" // Add autocomplete
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password" // Add autocomplete for new passwords
                        />
                        <RadioGroup>
                            <label>
                                <input
                                    type="radio"
                                    value="student"
                                    checked={userType === 'student'}
                                    onChange={(e) => setUserType(e.target.value)}
                                />
                                Student
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="admin"
                                    checked={userType === 'admin'}
                                    onChange={(e) => setUserType(e.target.value)}
                                />
                                Admin
                            </label>
                        </RadioGroup>
                        <Button type="submit">Register</Button>
                    </Form>
                </Container>
            </PageBackground>
            <Footer />
        </div>
    );
};

export default RegisterPage;
