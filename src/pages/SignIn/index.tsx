import { useMemo } from 'react';
import Container from 'common/Container';
import SignInForm from 'components/modules/sign/SignInForm';
import SignContainer from 'components/modules/sign/SignContainer';

function Index() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignContainer>
        <SignInForm />
      </SignContainer>
    </Container>
  );
}

export default Index;
