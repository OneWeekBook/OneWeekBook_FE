import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { signInInit, signInRequest } from 'redux/reducers/signInReducer';
import useInput from 'hooks/useInput';
import useSignValidate from 'hooks/useSignValidate';
import { inputFocusHandler } from 'utils/InputFocusHandler';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import BorderInput from 'components/atoms/inputs/BorderInput';
import DefaultText from 'components/atoms/texts/DefaultText';

function SignInForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);
  const { signInErrorMsg, signInErrorStatus, signInErrorHandler } =
    useSignValidate();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = { email, password };
      dispatch(signInRequest(user));
    },
    [email, password],
  );

  useEffect(() => {
    emailRef.current?.focus();
    return () => {
      setSignInError(false);
      dispatch(signInInit());
    };
  }, []);

  useEffect(() => {
    if (email && password) {
      signInErrorHandler(setSignInError);
    }
  }, [signInErrorStatus]);

  return (
    <SignInFormModule onSubmit={handleSubmit}>
      <BorderInput
        type="email"
        placeholder="이메일"
        value={email}
        onChange={changeEmail}
        onKeyPress={(event) => inputFocusHandler(event, passRef)}
        mref={emailRef}
      />
      <BorderInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={changePassword}
        mref={passRef}
      />
      {signInError && (
        <DefaultText
          content={signInErrorMsg}
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      )}
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
