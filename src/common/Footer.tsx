import styled from 'styled-components';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import theme from 'styles/theme';
import Container from './Container';

function Footer() {
  return (
    <Container as="footer">
      <FooterBody>
        <DefaultLabel
          content="ONEWEEKBOOK"
          subContent="Create by leejy001 leejh96"
          fontColor={theme.color.COLOR_WHITE}
          fontSize={2.8}
          flexGap={10}
          align="left"
        />
      </FooterBody>
    </Container>
  );
}

export default Footer;

const FooterBody = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 160px;
  }
`;
