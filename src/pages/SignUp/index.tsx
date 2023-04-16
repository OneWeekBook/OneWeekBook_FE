import { useMemo } from 'react';
import Container from 'common/Container';
import SignContainer from 'components/modules/sign/SignContainer';
import SignUpForm from 'components/modules/sign/SignUpForm';

function SignUpPage() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignContainer>
        <SignUpForm />
      </SignContainer>
    </Container>
  );
}

export default SignUpPage;
