import React, { useEffect, useState, useCallback, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { SignInInit, SignInRequest } from 'redux/reducers/SignIn';
import ErrorText from 'components/atoms/text/ErrorText';
import DefaultButton from 'components/atoms/button/DefaultButton';
import BorderInput from 'components/atoms/input/BorderInput';
import DefaultLabel from 'components/atoms/label/DefaultLabel';
import useInput from 'hooks/useInput';
import useRouter from 'hooks/useRouter';
import useInputEnter from 'hooks/useInputEnter';
import { useSignInErrorCheck } from 'hooks/useSignInErrorCheck';

function SignInForm() {
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);
  const { handleInputEnter } = useInputEnter();
  const { handleSignInError } = useSignInErrorCheck();
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
    <SignInFormWrapper>
      <DefaultLabel
        content="로그인"
        fontSize={3}
        fontColor={theme.color.COLOR_FONT_ONE}
      />
      <Form onSubmit={handleSubmit}>
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
        <DefaultButton
          type="submit"
          content="로그인"
          width="auto"
          fontSize={2}
        />
      </Form>
      <DefaultButton
        bgColor={['#faf39e', '#ffd400']}
        content="회원가입"
        width="auto"
        fontColor={['#000000', '#000000']}
        fontSize={2}
        handleClick={() => routeTo('/sign-up')}
      />
    </SignInFormWrapper>
  );
}

export default SignInForm;

const SignInFormWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  button {
    margin-top: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 20px;
  }
`;
