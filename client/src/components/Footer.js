import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background: linear-gradient(to right, #4e54c8, #8f94fb);
    color: white;
    padding: 20px;
    text-align: center;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <p>Prateek © 2024 Certificate Verification System. All rights reserved.</p>
        </StyledFooter>
    );
};

export default Footer;
