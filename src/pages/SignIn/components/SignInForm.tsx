import React, {
  useEffect,
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import ErrorForm from 'components/Form/ErrorForm';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInRequest } from 'redux/reducers/SignIn';
import { useInput } from 'hooks/useInput';

function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [signInError, setSignInError] = useState<boolean>(false);

  const { signInErrorStatus, signInErrorMsg } = useSelector(
    (state: any) => state.signIn,
  );

  useEffect(() => {
    switch (signInErrorStatus) {
      case 200:
        setSignInError(false);
        navigate('/');
        break;
      case 400:
      case 401:
      case 500:
      case 501:
        setSignInError(true);
        break;
      default:
        break;
    }
  }, [signInErrorStatus]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = { email, password };
      dispatch(SignInRequest(user));
    },
    [email, password],
  );

  return (
    <SignInFormWrapper>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          placeholder="이메일"
          defaultValue={email}
          onBlur={changeEmail}
        />
        <input
          id="password"
          placeholder="비밀번호"
          defaultValue={password}
          type="password"
          onBlur={changePassword}
        />
        {signInError && <ErrorForm error={signInErrorMsg} align="left" />}
        <button type="submit">로그인</button>
      </form>
      <Link to="/sign-up">
        <button type="button">회원가입</button>
      </Link>
    </SignInFormWrapper>
  );
}

export default SignInForm;

const SignInFormWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  padding: 0px 50px;
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    border: 1px solid #e6e6e6;
    margin: 5px auto;
    padding-left: 5px;
  }
  input:focus {
    outline: none !important;
    border: 1px solid lightblue;
  }
  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    margin: 10px auto;
    color: white;
    font-size: 18px;
    background-color: #1e90ff;
    :first-child {
      color: black;
      background-color: #e6e6e6;
    }
  }

  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding: 0px 30px;
  }
`;

const Title = styled.div`
  margin: 100px auto 20px;
  font-size: 18px;
  font-weight: 600;
`;
