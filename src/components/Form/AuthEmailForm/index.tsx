import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { AuthEmailInit, AuthEmailRequest } from 'redux/reducers/AuthEmail';
import { AuthCodeInit, AuthCodeRequest } from 'redux/reducers/AuthCode';
import useInput from 'hooks/useInput';
import DefaultButton from 'components/Button/DefaultButton';
import { useRegexCheck } from './func/RegCheck';
import { useAuthErrorCheck } from './func/AuthErrorCheck';
import TimerForm from '../TimerForm';
import EmailErrorForm from './components/EmailErrorForm';
import CodeErrorForm from './components/CodeErrorForm';
import FormInput from '../../Input/FormInput';

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
      <FormInput
        type="email"
        placeholder="이메일"
        state={email}
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
      </FormInput>
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
              pc={[0, 35]}
              onClick={authEmailClick}
              isHover
              hoverBgColor="#08c1e9"
              hoverColor="white"
              bgColor="#1e90ff"
              color="white"
              disabled={!emailReg}
              disabledColor="#a9a9a9"
              margin={[20, 0, 5, 0]}
              fontSize={[18, 18]}
              fontWeight={600}
              title="이메일 인증하기"
            />
          ) : (
            <DefaultButton
              pc={[0, 35]}
              onClick={authEmailClick}
              isHover
              hoverBgColor="#08c1e9"
              hoverColor="white"
              bgColor="#1e90ff"
              color="white"
              disabled={!emailReg}
              disabledColor="#a9a9a9"
              margin={[20, 0, 5, 0]}
              fontSize={[18, 18]}
              fontWeight={600}
              title="재발송"
            />
          )}
          {toggle && (
            <>
              <FormInput
                type="text"
                maxLength={6}
                placeholder="인증번호"
                state={code}
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
                pc={[0, 35]}
                onClick={codeInputClick}
                isHover
                hoverBgColor="#08c1e9"
                hoverColor="white"
                bgColor="#1e90ff"
                color="white"
                disabled={!codeReg}
                disabledColor="#a9a9a9"
                margin={[20, 0, 5, 0]}
                fontSize={[18, 18]}
                fontWeight={600}
                title="인증번호 확인"
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
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
