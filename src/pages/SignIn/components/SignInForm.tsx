import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { SignInInit, SignInRequest } from 'redux/reducers/SignIn';
import useInput from 'hooks/useInput';
import useInputEnter from 'hooks/useInputEnter';
import ErrorForm from 'components/Form/ErrorForm';
import FormInput from 'components/Input/FormInput';
import DefaultButton from 'components/Button/DefaultButton';
import { useSignInErrorCheck } from '../func/SignInErrorCheck';

function SignInForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);
  const { handleInputEnter } = useInputEnter();
  const { handleSignInError } = useSignInErrorCheck();
  const { signInErrorStatus, signInErrorMsg } = useSelector(
    (state: AppStateType) => state.signIn,
  );

  useEffect(() => {
    emailRef.current?.focus();
    return () => {
      setSignInError(false);
      dispatch(SignInInit());
    };
  }, []);

  useEffect(() => {
    if (email && password) {
      handleSignInError(signInErrorStatus, setSignInError);
    }
  }, [signInErrorStatus]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
        <FormInput
          type="email"
          placeholder="이메일"
          state={email}
          onChange={changeEmail}
          onKeyPress={(event) => handleInputEnter(event, passRef)}
          mref={emailRef}
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          state={password}
          onChange={changePassword}
          mref={passRef}
        />
        {signInError && <ErrorForm error={signInErrorMsg} align="left" />}
        <DefaultButton
          pc={[0, 50]}
          type="submit"
          isHover
          hoverBgColor="#08c1e9"
          hoverColor="white"
          bgColor="#1e90ff"
          color="white"
          margin={[10, 0, 10, 0]}
          fontSize={[18, 18]}
          fontWeight={600}
          title="로그인"
        />
      </form>
      <Link to="/sign-up">
        <DefaultButton
          pc={[0, 50]}
          isHover
          hoverBgColor="#303538"
          hoverColor="white"
          bgColor="#e6e6e6"
          margin={[10, 0, 10, 0]}
          fontSize={[18, 18]}
          fontWeight={600}
          title="회원가입"
        />
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
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding: 0px 30px;
  }
`;

const Title = styled.div`
  margin: 100px auto 20px;
  font-size: 18px;
  font-weight: 600;
`;
