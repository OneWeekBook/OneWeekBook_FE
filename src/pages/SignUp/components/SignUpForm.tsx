import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ErrorForm from 'components/Form/ErrorForm';
import AuthEmailForm from 'components/Form/AuthEmailForm';
import { SignUpInit, SignUpRequest } from 'redux/reducers/SignUp';
import { useInput } from 'hooks/useInput';
import OnboardInputForm from 'components/Form/OnboardInputForm';
import { useErrorCheck } from '../func/ErrorCheck';
import { useSignUpErrorCheck } from '../func/SignUpErrorCheck';

function SignUpForm() {
  const dispatch = useDispatch();
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
    return () => {
      setSignUpError(false);
      setAuthDone(false);
      setRegisterDone(true);
      dispatch(SignUpInit());
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            <OnboardInputForm
              type="password"
              placeholder="비밀번호"
              state={password}
              onChange={changePassword}
            />
            {passError && (
              <ErrorForm error="비밀번호 형식이 올바르지 않습니다." />
            )}
            <OnboardInputForm
              type="password"
              placeholder="비밀번호 확인"
              state={confirmPassword}
              onChange={changeConfirmPassword}
            />
            {passCompareError && (
              <ErrorForm error="비밀번호가 같지 않습니다." />
            )}
            <OnboardInputForm
              type="text"
              placeholder="이름"
              state={username}
              onChange={changeUserName}
            />
            <OnboardInputForm
              type="text"
              placeholder="닉네임"
              state={nick}
              onChange={changeNick}
            />
            {signUpError && <ErrorForm error="회원가입 실패" align="left" />}
            <button type="submit" disabled={registerDone}>
              회원가입
            </button>
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
  button {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 5px;
    margin: 20px auto 5px;
    color: white;
    font-size: 18px;
    background-color: #1e90ff;
    :disabled {
      background-color: #a9a9a9;
    }
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
