// src/components/Login.js
import React, { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const PageBackground = styled.div`
    background: linear-gradient(135deg, #8e44ad, #ff69b4);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 20px;
    border-radius:10px;
`;

const Container = styled.div`
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        padding: 30px;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-size: 32px;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const ErrorMessage = styled.p`
    color: #f44336;
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    background-color: rgba(244, 67, 54, 0.1);
    padding: 10px;
    border-radius: 5px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin: 10px 0 5px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
`;

const Input = styled.input`
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 25px;
    border: 2px solid #ddd;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #8A2BE2;
        box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
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

const InputGroup = styled.div`
    margin-bottom: 20px;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await userService.login({ username, password });
            localStorage.setItem('token', data.token); 
            navigate(data.userType === 'admin' ? '/admin' : '/student'); // Redirect based on user type
    
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Error logging in');
        }
    };
    

    return (
        <>
            <Header />
            <PageBackground>
                <Container>
                    <Title>Login</Title>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Form onSubmit={handleLogin}>
                        <InputGroup>
                            <Label>Username:</Label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Password:</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </InputGroup>
                        <Button type="submit">Login</Button>
                    </Form>
                </Container>
            </PageBackground>
            <Footer />
        </>
    );
};

export default Login;
