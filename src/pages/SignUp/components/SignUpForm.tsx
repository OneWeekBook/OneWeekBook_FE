import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorForm from 'components/Form/ErrorForm';
import { passwordRegex } from 'lib/Regex';
import AuthEmailForm from 'components/Form/AuthEmailForm';
import { SignUpInit, SignUpRequest } from 'redux/reducers/SignUp';
import { useInput } from 'hooks/useInput';
import OnboardInputForm from 'components/Form/OnboardInputForm';

function SignUpForm() {
  const navigate = useNavigate();
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

  const { signUpErrorStatus } = useSelector((state: any) => state.signUp);

  useEffect(() => {
    if (password && !passwordRegex.test(password)) {
      setPassError(true);
    } else if (password && passwordRegex.test(password)) {
      setPassError(false);
    }
  }, [password]);

  useEffect(() => {
    if (!passError && confirmPassword && password !== confirmPassword) {
      setPassCompareError(true);
    } else if (!passError && confirmPassword && password === confirmPassword) {
      setPassCompareError(false);
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (username && nick && !passError && !passCompareError)
      setRegisterDone(false);
    else setRegisterDone(true);
  }, [username, nick, password]);

  useEffect(() => {
    return () => {
      setSignUpError(false);
      setAuthDone(false);
      setRegisterDone(false);
      dispatch(SignUpInit());
    };
  }, []);

  useEffect(() => {
    switch (signUpErrorStatus) {
      case 200:
        alert('회원가입 완료, 로그인을 진행해주세요.');
        navigate('/sign-in');
        setSignUpError(false);
        break;
      case 400:
      case 500:
      case 501:
        setSignUpError(true);
        break;
      default:
        break;
    }
  }, [signUpErrorStatus]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, username, nick, password };
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
