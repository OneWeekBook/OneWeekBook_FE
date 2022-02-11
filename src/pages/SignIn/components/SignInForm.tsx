import React, {
  useEffect,
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import ErrorForm from 'components/Form/ErrorForm';
import { Link } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signInError, setSignInError] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = { email, password };
      console.log(user);
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
          onBlur={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <input
          id="password"
          placeholder="비밀번호"
          defaultValue={password}
          type="password"
          onBlur={(event: ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        {signInError && (
          <ErrorForm
            error="이메일, 비밀번호를 정확히 입력해주세요"
            align="left"
          />
        )}
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
