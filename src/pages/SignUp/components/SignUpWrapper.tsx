import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DefaultButton from 'components/Button/DefaultButton';
import SignUpForm from './SignUpForm';

function SignUpWrapper() {
  return (
    <Wrapper>
      <SignUpForm />
      <Link to="/sign-in">
        <DefaultButton
          pc={[0, 35]}
          isHover
          hoverBgColor="#303538"
          hoverColor="white"
          bgColor="#e6e6e6"
          margin={[5, 0, 5, 0]}
          fontSize={[18, 18]}
          fontWeight={600}
          title="로그인"
        />
      </Link>
    </Wrapper>
  );
}

export default SignUpWrapper;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  border: solid 2px lightblue;
  width: 375px;
  margin: auto;
  padding: 50px 50px;
  height: 500px;
  a {
    text-decoration: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 355px;
  }
`;
