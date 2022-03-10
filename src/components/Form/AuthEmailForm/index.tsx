import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AuthEmailInit, AuthEmailRequest } from 'redux/reducers/AuthEmail';
import { AuthCodeInit, AuthCodeRequest } from 'redux/reducers/AuthCode';
import { useInput } from 'hooks/useInput';
import TimerForm from '../TimerForm';
import EmailErrorForm from './components/EmailErrorForm';
import CodeErrorForm from './components/CodeErrorForm';
import OnboardInputForm from '../OnboardInputForm';
import { useRegexCheck } from './func/RegCheck';
import { useAuthErrorCheck } from './func/AuthErrorCheck';

type AuthMailTypes = {
  authDone: boolean;
  setAuthDone: Dispatch<SetStateAction<boolean>>;
  setRegisterEmail: Dispatch<SetStateAction<string>>;
};

function AuthEmailForm({
  authDone,
  setAuthDone,
  setRegisterEmail,
}: AuthMailTypes) {
  const dispatch = useDispatch();
  const [email, changeEmail] = useInput('');
  const [code, changeCode] = useInput('');

  const [emailReg, setEmailReg] = useState<boolean>(false);
  const [codeReg, setCodeReg] = useState<boolean>(false);

  const [emailDone, setEmailDone] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const { handleRegex } = useRegexCheck();
  const { handleEmailCheck, handleCodeCheck } = useAuthErrorCheck();

  const { emailErrorStatus, emailErrorMsg } = useSelector(
    (state: any) => state.authEmail,
  );

  const { codeErrorStatus, codeErrorMsg } = useSelector(
    (state: any) => state.authCode,
  );

  useEffect(() => {
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

  const authEmailClick = () => {
    dispatch(AuthEmailRequest({ email }));
  };

  const codeInputClick = () => {
    dispatch(AuthCodeRequest({ code }));
  };

  return (
    <AuthEmailWrapper>
      <OnboardInputForm
        type="email"
        placeholder="이메일"
        state={email}
        onChange={changeEmail}
        disabled={authDone}
      >
        {!authDone && emailDone && (
          <TimerWrapper>
            <TimerForm emailDone={emailDone} setEmailDone={setEmailDone} />
          </TimerWrapper>
        )}
      </OnboardInputForm>
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
            <button type="button" onClick={authEmailClick} disabled={!emailReg}>
              이메일 인증하기
            </button>
          ) : (
            <button type="button" onClick={authEmailClick} disabled={!emailReg}>
              재발송
            </button>
          )}
          {toggle && (
            <>
              <OnboardInputForm
                type="text"
                maxLength={6}
                placeholder="인증번호"
                state={code}
                pattern="[0-9]+"
                onChange={changeCode}
              />
              <CodeErrorForm
                code={code}
                codeReg={codeReg}
                codeErrorMsg={codeErrorMsg}
                codeErrorStatus={codeErrorStatus}
              />
              <button
                type="button"
                onClick={codeInputClick}
                disabled={!codeReg}
              >
                인증번호 확인
              </button>
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
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
