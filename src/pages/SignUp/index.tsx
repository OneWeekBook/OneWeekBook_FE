import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';

function SignUpPage() {
  return (
    <Container>
      <Wrapper>
        <SignUpForm />
        <Link to="/sign-in">
          <LoginButton>로그인</LoginButton>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default SignUpPage;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  border: solid 2px lightblue;
  width: 375px;
  margin: 100px auto 0;
  padding: 50px 50px;
  height: 500px;
  a {
    text-decoration: none;
  }
`;

const LoginButton = styled.div`
  width: 100%;
  height: 35px;
  line-height: 35px;
  border: none;
  border-radius: 5px;
  margin: 5px auto;
  color: black;
  font-size: 18px;
  background-color: #e6e6e6;
  text-align: center;
`;
