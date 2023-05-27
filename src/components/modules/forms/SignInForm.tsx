import React, { useEffect, useState, useCallback, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { SignInInit, SignInRequest } from 'redux/reducers/SignIn';
import useInput from 'hooks/useInput';
import useInputEnter from 'hooks/useInputEnter';
import { signInErrorHandler } from 'utils/signInErrorHandler';
import ErrorText from 'components/atoms/texts/ErrorText';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import BorderInput from 'components/atoms/inputs/BorderInput';

function SignInForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);
  const { handleInputEnter } = useInputEnter();
  const { handleSignInError } = signInErrorHandler();
  const { signInErrorStatus, signInErrorMsg } = useSelector(
    (state: AppStateType) => state.signIn,
    shallowEqual,
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = { email, password };
      dispatch(SignInRequest(user));
    },
    [email, password],
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

  return (
    <SignInFormModule onSubmit={handleSubmit}>
      <BorderInput
        type="email"
        placeholder="이메일"
        value={email}
        onChange={changeEmail}
        onKeyPress={(event) => handleInputEnter(event, passRef)}
        mref={emailRef}
      />
      <BorderInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={changePassword}
        mref={passRef}
      />
      {signInError && <ErrorText error={signInErrorMsg} align="left" />}
      <DefaultButton type="submit" content="로그인" width="auto" fontSize={2} />
    </SignInFormModule>
  );
}

export default SignInForm;

const SignInFormModule = styled.form`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 20px;
  }
`;
