import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorForm from 'components/Form/ErrorForm';
import { passwordRegex } from 'lib/Regex';
import AuthEmailForm from 'components/Form/AuthEmailForm';
import { SignUpRequest } from 'redux/reducers/SignUp';

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authDone, setAuthDone] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [nick, setNick] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passError, setPassError] = useState<boolean>(false);
  const [passCompareError, setPassCompareError] = useState<boolean>(false);
  const [registerDone, setRegisterDone] = useState<boolean>(true);
  const [signUpError, setSignUpError] = useState<boolean>(false);

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
    console.log(email, username, nick, password);
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
            <InputWrapper>
              <input
                type="password"
                placeholder="비밀번호"
                defaultValue={password}
                onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
              <span />
            </InputWrapper>
            {passError && (
              <ErrorForm error="비밀번호 형식이 올바르지 않습니다." />
            )}
            <InputWrapper>
              <input
                type="password"
                placeholder="비밀번호 확인"
                defaultValue={confirmPassword}
                onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(event.target.value)
                }
              />
              <span />
            </InputWrapper>
            {passCompareError && (
              <ErrorForm error="비밀번호가 같지 않습니다." />
            )}
            <InputWrapper>
              <input
                placeholder="이름"
                defaultValue={username}
                onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                  setUserName(event.target.value)
                }
              />
              <span />
            </InputWrapper>
            <InputWrapper>
              <input
                placeholder="닉네임"
                defaultValue={nick}
                onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                  setNick(event.target.value)
                }
              />
              <span />
            </InputWrapper>
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    :focus {
      outline: none;
    }
    box-sizing: border-box;
    padding: 0 5px;
    height: 30px;
    border: none;
    width: 100%;
    border-bottom: solid 1px black;
  }
  input ~ span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #1e90ff;
    transition: 0.4s;
  }
  input:focus ~ span {
    width: 100%;
    transition: 0.4s;
    left: 0;
  }
`;
