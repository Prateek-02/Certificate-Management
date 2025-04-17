import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    background: linear-gradient(to right, #4e54c8, #8f94fb);
    padding: 20px;
    color: white;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #FFD700; // Changed to gold color
`;

const Nav = styled.nav`
    ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    li {
        margin: 0 15px;
    }

    a {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        padding: 8px 12px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #FFD700;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
        }

        &:hover {
            color: #f0f0f0;
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);

            &::after {
                transform: scaleX(1);
                transform-origin: left;
            }
        }

        &:active {
            transform: translateY(0);
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <Title>Certificate Management System</Title>
            <Nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {/* Redirect to Login page when clicking these links */}
                    <li><Link to="/login">Admin Page</Link></li>
                    <li><Link to="/login">Student Page</Link></li>
                </ul>
            </Nav>
        </StyledHeader>
    );
};

export default Header;
