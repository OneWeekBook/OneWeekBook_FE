import { useMemo } from 'react';
import Container from 'common/Container';
import SignInForm from 'components/modules/sign/SignInForm';
import SignForm from 'components/modules/sign/SignForm';

function Index() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignForm>
        <SignInForm />
      </SignForm>
    </Container>
  );
}

export default Index;
