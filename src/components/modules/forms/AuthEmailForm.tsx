import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { AuthEmailInit, AuthEmailRequest } from 'redux/reducers/AuthEmail';
import { AuthCodeInit, AuthCodeRequest } from 'redux/reducers/AuthCode';
import { AuthMailTypes } from 'types/module';
import useInput from 'hooks/useInput';
import useAuthTimer from 'hooks/useAuthTimer';
import { useRegexCheck } from 'hooks/useRegCheck';
import { authErrorHandler } from 'utils/authErrorHandler';
import DefaultText from 'components/atoms/texts/DefaultText';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import BorderInput from 'components/atoms/inputs/BorderInput';
import EmailErrorForm from './EmailErrorForm';
import CodeErrorForm from './CodeErrorForm';

function AuthEmailForm({
  authDone,
  setAuthDone,
  setRegisterEmail,
}: AuthMailTypes) {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [email, changeEmail] = useInput('');
  const [code, changeCode] = useInput('');
  const [emailReg, setEmailReg] = useState<boolean>(false);
  const [codeReg, setCodeReg] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const { emailDone, setEmailDone, minutes, seconds } = useAuthTimer();
  const { handleRegex } = useRegexCheck();
  const { handleEmailCheck, handleCodeCheck } = authErrorHandler();

  const { emailErrorStatus, emailErrorMsg } = useSelector(
    (state: AppStateType) => state.authEmail,
    shallowEqual,
  );

  const { codeErrorStatus, codeErrorMsg } = useSelector(
    (state: AppStateType) => state.authCode,
    shallowEqual,
  );

  useEffect(() => {
    emailRef.current?.focus();
    return () => {
      dispatch(AuthCodeInit());
      dispatch(AuthEmailInit());
    };
  }, []);

  useEffect(() => {
    handleRegex({ email, code }, { setEmailReg, setCodeReg });
  }, [email, code]);

  useEffect(() => {
    handleEmailCheck(emailErrorStatus, { setEmailDone, setToggle });
    handleCodeCheck(codeErrorStatus, {
      email,
      setRegisterEmail,
      setCodeReg,
      setAuthDone,
    });
  }, [emailErrorStatus, codeErrorStatus]);

  useEffect(() => {
    if (toggle) codeRef.current?.focus();
  }, [toggle]);

  const authEmailClick = () => {
    dispatch(AuthEmailRequest({ email }));
  };

  const codeInputClick = () => {
    dispatch(AuthCodeRequest({ code }));
  };

  const handleEmailCheckEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      authEmailClick();
    }
  };

  const handleCodeCheckEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      codeInputClick();
    }
  };

  return (
    <AuthEmailFormModule>
      <BorderInput
        type="email"
        placeholder="이메일"
        value={email}
        onChange={changeEmail}
        onKeyPress={handleEmailCheckEnter}
        disabled={emailDone}
        mref={emailRef}
      >
        {!authDone && emailDone && (
          <TimerWrapper>
            <DefaultText
              content={`${minutes} :`}
              fontSize={1.2}
              fontColor={theme.color.COLOR_RED}
            />
            &nbsp;
            <DefaultText
              content={String(seconds).padStart(2, '0')}
              fontSize={1.2}
              fontColor={theme.color.COLOR_RED}
            />
          </TimerWrapper>
        )}
      </BorderInput>
      {!authDone && (
        <>
          <EmailErrorForm
            email={email}
            emailReg={emailReg}
            emailDone={emailDone}
            emailErrorMsg={emailErrorMsg}
            emailErrorStatus={emailErrorStatus}
          />
          {!emailDone ? (
            <DefaultButton
              handleClick={authEmailClick}
              disabled={!emailReg}
              fontSize={1.8}
              width="full"
              content="이메일 인증하기"
            />
          ) : (
            <DefaultButton
              handleClick={authEmailClick}
              disabled={!emailReg}
              fontSize={1.8}
              width="full"
              content="재발송"
            />
          )}
          {toggle && (
            <>
              <BorderInput
                type="text"
                maxLength={6}
                placeholder="인증번호"
                value={code}
                pattern="[0-9]+"
                onChange={changeCode}
                onKeyPress={handleCodeCheckEnter}
                mref={codeRef}
              />
              <CodeErrorForm
                code={code}
                codeReg={codeReg}
                codeErrorMsg={codeErrorMsg}
                codeErrorStatus={codeErrorStatus}
              />
              <DefaultButton
                handleClick={codeInputClick}
                disabled={!codeReg}
                fontSize={1.8}
                width="full"
                content="인증번호 확인"
              />
            </>
          )}
        </>
      )}
    </AuthEmailFormModule>
  );
}

export default AuthEmailForm;

const AuthEmailFormModule = styled.div`
  margin-top: 20px;
  button {
    margin-top: 10px;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 0;
`;
