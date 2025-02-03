import styled from 'styled-components';

export const Footer = styled.footer`
  color: white;
  height: 4vh;
  padding: 0;
  margin: 0;
`;

export const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  color: white;
  font-size: 16px; 


  @media (max-width: 768px) {
    font-size: 14px; 
  }

  @media (max-width: 600px) {
    font-size: 12px;  
  }
`;
