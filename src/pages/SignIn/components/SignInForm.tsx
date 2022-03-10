import React, { useEffect, FormEvent, useState, useCallback } from 'react';
import styled from 'styled-components';
import ErrorForm from 'components/Form/ErrorForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInInit, SignInRequest } from 'redux/reducers/SignIn';
import { useInput } from 'hooks/useInput';
import OnboardInputForm from 'components/Form/OnboardInputForm';
import { useSignInErrorCheck } from '../func/SignInErrorCheck';

function SignInForm() {
  const dispatch = useDispatch();
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);

  const { handleSignInError } = useSignInErrorCheck();

  const { signInErrorStatus, signInErrorMsg } = useSelector(
    (state: any) => state.signIn,
  );

  useEffect(() => {
    return () => {
      setSignInError(false);
      dispatch(SignInInit());
    };
  }, []);

  useEffect(() => {
    handleSignInError(signInErrorStatus, setSignInError);
  }, [signInErrorStatus]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = { email, password };
      dispatch(SignInRequest(user));
    },
    [email, password],
  );

  return (
    <SignInFormWrapper>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <OnboardInputForm
          type="email"
          placeholder="이메일"
          state={email}
          onChange={changeEmail}
        />
        <OnboardInputForm
          type="password"
          placeholder="비밀번호"
          state={password}
          onChange={changePassword}
        />
        {signInError && <ErrorForm error={signInErrorMsg} align="left" />}
        <button type="submit">로그인</button>
      </form>
      <Link to="/sign-up">
        <button type="button">회원가입</button>
      </Link>
    </SignInFormWrapper>
  );
}

export default SignInForm;

const SignInFormWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  padding: 0px 50px;
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    margin: 10px auto;
    color: white;
    font-size: 18px;
    background-color: #1e90ff;
    :first-child {
      color: black;
      background-color: #e6e6e6;
    }
  }

  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding: 0px 30px;
  }
`;

const Title = styled.div`
  margin: 100px auto 20px;
  font-size: 18px;
  font-weight: 600;
`;
