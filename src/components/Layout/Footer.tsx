import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

function Footer() {
  return (
    <Container as="footer">
      <LOGO>ONEWEEKBOOK</LOGO>
      <DESC>Create by leejy001 leejh96</DESC>
    </Container>
  );
}

export default Footer;

const LOGO = styled.p`
  color: #fffafa;
  font-size: 28px;
  font-weight: 800;
  margin-top: 50px;
`;

const DESC = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;
