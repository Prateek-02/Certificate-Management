import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  color: #444;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  &:before {
    content: '✓';
    color: #4CAF50;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const Container = () => {
  return (
    <ContainerWrapper>
      <Title>Certificate Verification System</Title>
      <Description>
        Welcome to our Certificate Verification System. This application allows you to securely verify the authenticity of certificates using blockchain technology.
      </Description>
      <Description>
        How it works:
        <List>
          <ListItem>Certificates are issued and stored on the blockchain</ListItem>
          <ListItem>Each certificate has a unique identifier</ListItem>
          <ListItem>Users can verify certificates by entering the unique identifier</ListItem>
          <ListItem>The system checks the blockchain for authenticity</ListItem>
        </List>
      </Description>
      <Description>
        This system ensures tamper-proof verification and eliminates the possibility of fraudulent certificates.
      </Description>
    </ContainerWrapper>
  );
};

export default Container;
