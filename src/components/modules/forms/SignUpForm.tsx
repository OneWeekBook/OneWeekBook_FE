import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { signUpInit, signUpRequest } from 'redux/reducers/signUpReducer';
import { SignUpTypes } from 'types/module';
import useInput from 'hooks/useInput';
import { inputFocusHandler } from 'utils/InputFocusHandler';
import useSignValidate from 'hooks/useSignValidate';
import { passwordValidateHandler } from 'utils/validateCheckHandler';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import BorderInput from 'components/atoms/inputs/BorderInput';
import DefaultText from 'components/atoms/texts/DefaultText';

function SignUpForm({ email, authDone, setAuthDone }: SignUpTypes) {
  const dispatch = useDispatch();
  const passRef = useRef<HTMLInputElement>(null);
  const passConfRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null);
  const [password, changePassword] = useInput('');
  const [confirmPassword, changeConfirmPassword] = useInput('');
  const [username, changeUserName] = useInput('');
  const [nick, changeNick] = useInput('');
  const [passError, setPassError] = useState<boolean>(false);
  const [passCompareError, setPassCompareError] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [registerDone, setRegisterDone] = useState<boolean>(true);
  const { signUpErrorStatus, signUpErrorHandler } = useSignValidate();

  useEffect(() => {
    passwordValidateHandler(
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
    signUpErrorHandler(setSignUpError);
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
      dispatch(signUpInit());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, username, nick, password, confirmPassword };
    dispatch(signUpRequest(formData));
  };

  return (
    <SignUpFormModule onSubmit={handleSubmit}>
      <BorderInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={changePassword}
        onKeyPress={(event) => inputFocusHandler(event, passConfRef)}
        mref={passRef}
      />
      {passError && (
        <DefaultText
          content="비밀번호 형식이 올바르지 않습니다."
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      )}
      <BorderInput
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={changeConfirmPassword}
        onKeyPress={(event) => inputFocusHandler(event, nameRef)}
        mref={passConfRef}
      />
      {passCompareError && (
        <DefaultText
          content="비밀번호가 같지 않습니다."
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      )}
      <BorderInput
        type="text"
        placeholder="이름"
        value={username}
        onChange={changeUserName}
        onKeyPress={(event) => inputFocusHandler(event, nickRef)}
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
        <DefaultText
          content="회원가입 실패, 이미 존재하는 이메일 입니다."
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      )}
      <DefaultButton
        type="submit"
        content="회원가입"
        width="auto"
        disabled={registerDone}
        fontSize={2}
      />
    </SignUpFormModule>
  );
}

export default SignUpForm;

const SignUpFormModule = styled.form`
  display: flex;
  flex-direction: column;
`;
