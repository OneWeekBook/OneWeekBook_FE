import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpInit, SignUpRequest } from 'redux/reducers/SignUp';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import useInputEnter from 'hooks/useInputEnter';
import ErrorForm from 'components/Form/ErrorForm';
import AuthEmailForm from 'components/Form/AuthEmailForm';
import FormInput from 'components/Input/FormInput';
import DefaultButton from 'components/Button/DefaultButton';
import { useSignUpErrorCheck } from '../func/SignUpErrorCheck';
import { useErrorCheck } from '../func/ErrorCheck';

function SignUpForm() {
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
  const { handleError } = useErrorCheck();
  const { handleSignUpError } = useSignUpErrorCheck();
  const { handleInputEnter } = useInputEnter();
  const { signUpErrorStatus } = useSelector((state: any) => state.signUp);

  useEffect(() => {
    handleError(
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
      <Title>이메일로 회원가입</Title>
      <AuthEmailForm
        authDone={authDone}
        setAuthDone={setAuthDone}
        setRegisterEmail={setEmail}
      />
      <FormWrapper>
        {authDone && (
          <form onSubmit={handleSubmit}>
            <FormInput
              type="password"
              placeholder="비밀번호"
              state={password}
              onChange={changePassword}
              onKeyPress={(event) => handleInputEnter(event, passConfRef)}
              mref={passRef}
            />
            {passError && (
              <ErrorForm error="비밀번호 형식이 올바르지 않습니다." />
            )}
            <FormInput
              type="password"
              placeholder="비밀번호 확인"
              state={confirmPassword}
              onChange={changeConfirmPassword}
              onKeyPress={(event) => handleInputEnter(event, nameRef)}
              mref={passConfRef}
            />
            {passCompareError && (
              <ErrorForm error="비밀번호가 같지 않습니다." />
            )}
            <FormInput
              type="text"
              placeholder="이름"
              state={username}
              onChange={changeUserName}
              onKeyPress={(event) => handleInputEnter(event, nickRef)}
              mref={nameRef}
            />
            <FormInput
              type="text"
              placeholder="닉네임"
              state={nick}
              onChange={changeNick}
              mref={nickRef}
            />
            {signUpError && <ErrorForm error="회원가입 실패" align="left" />}
            <DefaultButton
              type="submit"
              pc={[0, 35]}
              isHover
              hoverBgColor="#08c1e9"
              hoverColor="white"
              bgColor="#1e90ff"
              color="white"
              disabled={registerDone}
              disabledColor="#a9a9a9"
              margin={[20, 0, 5, 0]}
              fontSize={[18, 18]}
              fontWeight={600}
              title="회원가입"
            />
          </form>
        )}
      </FormWrapper>
    </SignUpFormWrapper>
  );
}

export default SignUpForm;

const SignUpFormWrapper = styled.div`
  background-color: white;
  width: 100%;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const FormWrapper = styled.div`
  input {
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: solid 1px black;
    padding: 5px 5px;
    margin-top: 10px;
  }
`;
