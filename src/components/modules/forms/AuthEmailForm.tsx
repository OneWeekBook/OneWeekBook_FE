import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import {
  authEmailInit,
  authEmailRequest,
} from 'redux/reducers/authEmailReducer';
import { authCodeInit, authCodeRequest } from 'redux/reducers/authCodeReducer';
import { AuthMailTypes } from 'types/module';
import useInput from 'hooks/useInput';
import useAuthTimer from 'hooks/useAuthTimer';
import { codeErrorHandler, emailErrorHandler } from 'utils/authErrorHandler';
import { authEmailValidateHandler } from 'utils/validateCheckHandler';
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
  const [emailValidate, setEmailValidate] = useState<boolean>(false);
  const [codeValidate, setCodeValidate] = useState<boolean>(false);
  const [authCodeToggle, setAuthCodeToggle] = useState<boolean>(false);
  const { emailDone, setEmailDone, minutes, seconds } = useAuthTimer();

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
      dispatch(authCodeInit());
      dispatch(authEmailInit());
    };
  }, []);

  useEffect(() => {
    authEmailValidateHandler(
      { email, code },
      { setEmailValidate, setCodeValidate },
    );
  }, [email, code]);

  useEffect(() => {
    emailErrorHandler(emailErrorStatus, { setEmailDone, setAuthCodeToggle });
    codeErrorHandler(codeErrorStatus, {
      email,
      setRegisterEmail,
      setCodeValidate,
      setAuthDone,
    });
  }, [emailErrorStatus, codeErrorStatus]);

  useEffect(() => {
    if (authCodeToggle) codeRef.current?.focus();
  }, [authCodeToggle]);

  const authEmailClick = () => {
    dispatch(authEmailRequest({ email }));
  };

  const codeInputClick = () => {
    dispatch(authCodeRequest({ code }));
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
        handleChange={changeEmail}
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
            emailReg={emailValidate}
            emailDone={emailDone}
            emailErrorMsg={emailErrorMsg}
            emailErrorStatus={emailErrorStatus}
          />
          {!emailDone ? (
            <DefaultButton
              handleClick={authEmailClick}
              disabled={!emailValidate}
              fontSize={1.8}
              width="full"
              content="이메일 인증하기"
            />
          ) : (
            <DefaultButton
              handleClick={authEmailClick}
              disabled={!emailValidate}
              fontSize={1.8}
              width="full"
              content="재발송"
            />
          )}
          {authCodeToggle && (
            <>
              <BorderInput
                type="text"
                maxLength={6}
                placeholder="인증번호"
                value={code}
                pattern="[0-9]+"
                handleChange={changeCode}
                onKeyPress={handleCodeCheckEnter}
                mref={codeRef}
              />
              <CodeErrorForm
                code={code}
                codeReg={codeValidate}
                codeErrorMsg={codeErrorMsg}
                codeErrorStatus={codeErrorStatus}
              />
              <DefaultButton
                handleClick={codeInputClick}
                disabled={!codeValidate}
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
