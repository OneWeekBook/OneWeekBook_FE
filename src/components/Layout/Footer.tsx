import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

function Footer() {
  return (
    <Container as="footer">
      <Wrapper>
        <LOGO>ONEWEEKBOOK</LOGO>
        <DESC>Create by leejy001 leejh96</DESC>
      </Wrapper>
    </Container>
  );
}

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: auto;
    width: 90%;
  }
`;

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
