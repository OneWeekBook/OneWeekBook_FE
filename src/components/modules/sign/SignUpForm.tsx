import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { SignUpInit, SignUpRequest } from 'redux/reducers/SignUp';
import useInput from 'hooks/useInput';
import useRouter from 'hooks/useRouter';
import useInputEnter from 'hooks/useInputEnter';
import { useFormErrorCheck } from 'hooks/useFormErrorCheck';
import { useSignUpErrorCheck } from 'hooks/useSignUpErrorCheck';
import ErrorText from 'components/atoms/text/ErrorText';
import AuthEmailForm from 'components/modules/sign/SignAuthEmail';
import DefaultButton from 'components/atoms/button/DefaultButton';
import DefaultLabel from 'components/atoms/label/DefaultLabel';
import BorderInput from 'components/atoms/input/BorderInput';

function SignUpForm() {
  const { routeTo } = useRouter();
  const dispatch = useDispatch();
  const passRef = useRef<HTMLInputElement>(null);
  const passConfRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>('');
  const [password, changePassword] = useInput('');
  const [confirmPassword, changeConfirmPassword] = useInput('');
  const [username, changeUserName] = useInput('');
  const [nick, changeNick] = useInput('');
  const [passError, setPassError] = useState<boolean>(false);
  const [passCompareError, setPassCompareError] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [authDone, setAuthDone] = useState<boolean>(false);
  const [registerDone, setRegisterDone] = useState<boolean>(true);
  const { handleFormError } = useFormErrorCheck();
  const { handleSignUpError } = useSignUpErrorCheck();
  const { handleInputEnter } = useInputEnter();
  const signUpErrorStatus = useSelector(
    (state: AppStateType) => state.signUp.signUpErrorStatus,
  );

  useEffect(() => {
    handleFormError(
      { username, nick, password, confirmPassword },
      {
        passError,
        setPassError,
        passCompareError,
        setPassCompareError,
      },
    );
  }, [username, nick, password, confirmPassword]);

  useEffect(() => {
    if (username && nick && !passError && !passCompareError)
      setRegisterDone(false);
    else setRegisterDone(true);
  }, [username, nick, passError, passCompareError]);

  useEffect(() => {
    handleSignUpError(signUpErrorStatus, setSignUpError);
  }, [signUpErrorStatus]);

  useEffect(() => {
    if (authDone) {
      passRef.current?.focus();
    }
  }, [authDone]);

  useEffect(() => {
    return () => {
      setSignUpError(false);
      setAuthDone(false);
      setRegisterDone(true);
      dispatch(SignUpInit());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, username, nick, password, confirmPassword };
    dispatch(SignUpRequest(formData));
  };

  return (
    <SignUpFormWrapper>
      <DefaultLabel
        content="이메일로 회원가입"
        fontSize={2.4}
        fontColor={theme.color.COLOR_FONT_ONE}
      />
      <AuthEmailForm
        authDone={authDone}
        setAuthDone={setAuthDone}
        setRegisterEmail={setEmail}
      />
      {authDone && (
        <Form onSubmit={handleSubmit}>
          <BorderInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
            onKeyPress={(event) => handleInputEnter(event, passConfRef)}
            mref={passRef}
          />
          {passError && (
            <ErrorText
              error="비밀번호 형식이 올바르지 않습니다."
              align="left"
            />
          )}
          <BorderInput
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            onKeyPress={(event) => handleInputEnter(event, nameRef)}
            mref={passConfRef}
          />
          {passCompareError && (
            <ErrorText error="비밀번호가 같지 않습니다." align="left" />
          )}
          <BorderInput
            type="text"
            placeholder="이름"
            value={username}
            onChange={changeUserName}
            onKeyPress={(event) => handleInputEnter(event, nickRef)}
            mref={nameRef}
          />
          <BorderInput
            type="text"
            placeholder="닉네임"
            value={nick}
            onChange={changeNick}
            mref={nickRef}
          />
          {signUpError && (
            <ErrorText
              error="회원가입 실패, 이미 존재하는 이메일 입니다."
              align="left"
            />
          )}
          <DefaultButton
            type="submit"
            content="회원가입"
            width="auto"
            disabled={registerDone}
            fontSize={2}
          />
        </Form>
      )}
      <DefaultButton
        bgColor={['#faf39e', '#ffd400']}
        content="로그인"
        width="auto"
        fontColor={['#000000', '#000000']}
        fontSize={2}
        handleClick={() => routeTo('/sign-in')}
      />
    </SignUpFormWrapper>
  );
}

export default SignUpForm;

const SignUpFormWrapper = styled.div`
  background-color: white;
  width: 100%;
  text-align: center;
  button {
    margin-top: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
