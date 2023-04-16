import { useMemo } from 'react';
import Container from 'common/Container';
import SignForm from 'components/modules/sign/SignForm';
import useRouter from 'hooks/useRouter';
import DefaultButton from 'components/atoms/button/DefaultButton';
import SignUpForm from '../../components/modules/sign/SignUpForm';

function SignUpPage() {
  const { routeTo } = useRouter();

  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignForm>
        <SignUpForm />
        <DefaultButton
          bgColor={['#faf39e', '#ffd400']}
          content="로그인"
          width="auto"
          fontColor={['#000000', '#000000']}
          fontSize={2}
          handleClick={() => routeTo('/sign-in')}
        />
      </SignForm>
    </Container>
  );
}

export default SignUpPage;
