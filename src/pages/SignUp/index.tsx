import { lazy, useMemo } from 'react';
import Container from 'components/Container';

const SignUpWrapper = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpWrapper" */ './components/SignUpWrapper'
    ),
);

function SignUpPage() {
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignUpWrapper />
    </Container>
  );
}

export default SignUpPage;
