import React, {
  ChangeEvent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { codeRegex, emailRegex } from 'lib/Regex';
import { AuthEmailRequest } from 'redux/reducers/AuthEmail';
import { AuthCodeRequest } from 'redux/reducers/AuthCode';
import TimerForm from '../TimerForm';
import EmailErrorForm from './components/EmailErrorForm';
import CodeErrorForm from './components/CodeErrorForm';

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
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const [emailReg, setEmailReg] = useState<boolean>(false);
  const [codeReg, setCodeReg] = useState<boolean>(false);

  const [emailDone, setEmailDone] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const { emailErrorStatus, emailErrorMsg } = useSelector(
    (state: any) => state.authEmail,
  );

  const { codeErrorStatus, codeErrorMsg } = useSelector(
    (state: any) => state.authCode,
  );

  useEffect(() => {
    if (email && !emailRegex.test(email)) {
      setEmailReg(false);
    } else if (email && emailRegex.test(email)) {
      setEmailReg(true);
    }
  }, [email]);

  useEffect(() => {
    if (code && !codeRegex.test(code)) {
      setCodeReg(false);
    } else if (code && codeRegex.test(code)) {
      setCodeReg(true);
    }
  }, [code]);

  useEffect(() => {
    switch (emailErrorStatus) {
      case 200:
        setEmailDone(true);
        setToggle(true);
        break;
      case 400:
      default:
        break;
    }
  }, [emailErrorStatus]);

  useEffect(() => {
    switch (codeErrorStatus) {
      case 200:
        setRegisterEmail(email);
        setCodeReg(false);
        setAuthDone(true);
        break;
      case 400:
      case 408:
        setCodeReg(true);
        setAuthDone(false);
        break;
      default:
        break;
    }
  }, [codeErrorStatus]);

  const authEmailClick = () => {
    dispatch(AuthEmailRequest({ email }));
  };

  const codeInputClick = () => {
    dispatch(AuthCodeRequest({ code }));
  };

  return (
    <AuthEmailWrapper>
      <InputWrapper>
        <input
          placeholder="이메일"
          defaultValue={email}
          onBlur={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          disabled={authDone}
        />
        {!authDone && emailDone && (
          <TimerWrapper>
            <TimerForm emailDone={emailDone} setEmailDone={setEmailDone} />
          </TimerWrapper>
        )}
        <span />
      </InputWrapper>
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
              <InputWrapper>
                <input
                  maxLength={6}
                  placeholder="인증번호"
                  defaultValue={code}
                  pattern="[0-9]+"
                  onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                    setCode(event.target.value)
                  }
                />
                <span />
              </InputWrapper>
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

const AuthEmailWrapper = styled.div``;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  :first-child {
    margin-top: 30px;
  }
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
  input:disabled {
    background-color: white;
  }
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
