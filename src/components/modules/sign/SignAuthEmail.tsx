import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { AuthEmailInit, AuthEmailRequest } from 'redux/reducers/AuthEmail';
import { AuthCodeInit, AuthCodeRequest } from 'redux/reducers/AuthCode';
import useInput from 'hooks/useInput';
import { useRegexCheck } from 'hooks/useRegCheck';
import { useAuthErrorCheck } from 'hooks/useAuthErrorCheck';
import DefaultButton from 'components/atoms/button/DefaultButton';
import BorderInput from 'components/atoms/input/BorderInput';
import TimerForm from '../../Form/TimerForm';
import EmailErrorForm from '../error/EmailErrorForm';
import CodeErrorForm from '../error/CodeErrorForm';

type AuthMailTypes = {
  authDone: boolean;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
};

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

  const [emailDone, setEmailDone] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const { handleRegex } = useRegexCheck();
  const { handleEmailCheck, handleCodeCheck } = useAuthErrorCheck();

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

  const onEmailCheckEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      authEmailClick();
    }
  };

  const onCodeCheckEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      codeInputClick();
    }
  };

  return (
    <AuthEmailWrapper>
      <BorderInput
        type="email"
        placeholder="이메일"
        value={email}
        onChange={changeEmail}
        onKeyPress={onEmailCheckEnter}
        disabled={emailDone}
        mref={emailRef}
      >
        {!authDone && emailDone && (
          <TimerWrapper>
            <TimerForm emailDone={emailDone} setEmailDone={setEmailDone} />
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
              width="auto"
              content="이메일 인증하기"
            />
          ) : (
            <DefaultButton
              handleClick={authEmailClick}
              disabled={!emailReg}
              fontSize={1.8}
              width="auto"
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
                onKeyPress={onCodeCheckEnter}
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
                width="auto"
                content="인증번호 확인"
              />
            </>
          )}
        </>
      )}
    </AuthEmailWrapper>
  );
}

export default AuthEmailForm;

const AuthEmailWrapper = styled.div`
  margin-top: 20px;
  button {
    margin-top: 10px;
  }
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
