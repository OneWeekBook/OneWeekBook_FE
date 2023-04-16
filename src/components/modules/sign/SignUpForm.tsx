import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { SignUpInit, SignUpRequest } from 'redux/reducers/SignUp';
import ErrorText from 'components/atoms/text/ErrorText';
import AuthEmailForm from 'components/Form/AuthEmailForm';
import DefaultButton from 'components/Button/DefaultButton';
import DefaultLabel from 'components/atoms/label/DefaultLabel';
import BorderInput from 'components/atoms/input/BorderInput';
import useInput from 'hooks/useInput';
import useInputEnter from 'hooks/useInputEnter';
import { useFormErrorCheck } from 'hooks/useFormErrorCheck';
import { useSignUpErrorCheck } from 'hooks/useSignUpErrorCheck';

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
      <FormWrapper>
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
              <ErrorText error="비밀번호 형식이 올바르지 않습니다." />
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
              <ErrorText error="비밀번호가 같지 않습니다." />
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
            {signUpError && <ErrorText error="회원가입 실패" align="left" />}
            <DefaultButton
              type="submit"
              pc={[0, 35]}
              isHover
              hoverBgColor="#f07055"
              hoverColor="white"
              bgColor="#c05944"
              color="white"
              disabled={registerDone}
              disabledColor="#a9a9a9"
              margin={[20, 0, 5, 0]}
              fontSize={[18, 18]}
              fontWeight={600}
              title="회원가입"
            />
          </Form>
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
