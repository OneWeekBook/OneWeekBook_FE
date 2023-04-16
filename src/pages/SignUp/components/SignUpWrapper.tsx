import { Link } from 'react-router-dom';
import DefaultButton from 'components/Button/DefaultButton';
import SignForm from 'components/modules/sign/SignForm';
import SignUpForm from './SignUpForm';

function SignUpWrapper() {
  return (
    <SignForm>
      <SignUpForm />
      <Link to="/sign-in">
        <DefaultButton
          pc={[0, 35]}
          isHover
          hoverBgColor="#ffd400"
          hoverColor="black"
          bgColor="#faf39e"
          margin={[5, 0, 5, 0]}
          fontSize={[18, 18]}
          fontWeight={600}
          title="로그인"
        />
      </Link>
    </SignForm>
  );
}

export default SignUpWrapper;
