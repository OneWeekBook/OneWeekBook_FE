import { useMemo } from 'react';
import theme from 'styles/theme';
import useRouter from 'hooks/useRouter';
import Container from 'common/Container';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import SignContainer from 'components/modules/commons/SignContainer';
import SignInForm from 'components/modules/forms/SignInForm';

function Index() {
  const { routeTo } = useRouter();
  const FormStyle = useMemo(
    () => ({ height: '100%', display: 'flex', alignItems: 'center' }),
    [],
  );

  return (
    <Container style={FormStyle}>
      <SignContainer>
        <DefaultLabel
          content="로그인"
          fontSize={2.4}
          fontColor={theme.color.COLOR_SIENNA}
        />
        <SignInForm />
        <DefaultButton
          bgColor={[theme.color.COLOR_LEMON_CHIFFON, theme.color.COLOR_GOLD]}
          content="회원가입"
          width="auto"
          fontColor={[theme.color.COLOR_BLACK, theme.color.COLOR_BLACK]}
          fontSize={2}
          handleClick={() => routeTo('/sign-up')}
        />
      </SignContainer>
    </Container>
  );
}

export default Index;
