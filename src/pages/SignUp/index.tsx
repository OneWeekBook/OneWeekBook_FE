import { useMemo, useState } from 'react';
import theme from 'styles/theme';
import useRouter from 'hooks/useRouter';
import Container from 'common/Container';
import SignContainer from 'components/modules/signs/SignContainer';
import SignUpForm from 'components/modules/signs/SignUpForm';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import AuthEmailForm from 'components/modules/signs/SignAuthEmail';

function SignUpPage() {
  const { routeTo } = useRouter();
  const [email, setEmail] = useState<string>('');
  const [authDone, setAuthDone] = useState<boolean>(false);
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignContainer>
        <DefaultLabel
          content="이메일로 회원가입"
          fontSize={2.4}
          fontColor={theme.color.COLOR_FONT_ONE}
        />
        <AuthEmailForm
          authDone={authDone}
          setAuthDone={setAuthDone}
          setRegisterEmail={setEmail}
        />
        {authDone && (
          <SignUpForm email={email} setAuthDone={setAuthDone} authDone />
        )}
        <DefaultButton
          bgColor={[theme.color.COLOR_LEMON_CHIFFON, theme.color.COLOR_GOLD]}
          content="로그인"
          width="auto"
          fontColor={[theme.color.COLOR_BLACK, theme.color.COLOR_BLACK]}
          fontSize={2}
          handleClick={() => routeTo('/sign-in')}
        />
      </SignContainer>
    </Container>
  );
}

export default SignUpPage;
