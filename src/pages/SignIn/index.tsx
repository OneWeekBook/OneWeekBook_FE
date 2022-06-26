import { useMemo } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import SignInForm from './components/SignInForm';

function Index() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <Wrapper>
        <SignInWrapper>
          <SignInForm />
        </SignInWrapper>
      </Wrapper>
    </Container>
  );
}

export default Index;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  border: solid 2px lightblue;
  width: 375px;
  margin: auto;
  height: 500px;
  a {
    text-decoration: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 355px;
  }
`;

const SignInWrapper = styled.div`
  background-color: white;
  width: 100%;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
  }
`;
