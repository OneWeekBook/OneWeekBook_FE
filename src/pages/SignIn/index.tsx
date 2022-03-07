import React, { useMemo } from 'react';
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
        <ImgWrapper />
        <SignInWrapper>
          <SignInForm />
        </SignInWrapper>
      </Wrapper>
    </Container>
  );
}

export default Index;

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  background-color: lightblue;
  border: solid 2px lightblue;
  width: 70%;
  height: 500px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const SignInWrapper = styled.div`
  flex-shrink: 0;
  width: 400px;
  height: 500px;
  background-color: white;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 100%;
  }
`;
