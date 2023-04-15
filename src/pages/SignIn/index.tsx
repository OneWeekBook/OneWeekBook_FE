import { lazy, useMemo } from 'react';
import Container from 'common/Container';

const SignInForm = lazy(
  () => import(/* webpackChunkName: "SignInForm" */ './components/SignInForm'),
);

function Index() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignInForm />
    </Container>
  );
}

export default Index;
