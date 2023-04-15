import styled from 'styled-components';
import Container from './Container';

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
  color: ${({ theme }) => theme.color.COLOR_FONT_FOUR};
  font-size: 2.8rem;
  font-weight: 700;
  margin-top: 50px;
`;

const DESC = styled.p`
  color: ${({ theme }) => theme.color.COLOR_FONT_FOUR};
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 20px;
`;
