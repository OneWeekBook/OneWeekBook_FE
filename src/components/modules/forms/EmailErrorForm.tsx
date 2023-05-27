import theme from 'styles/theme';
import { EmailErrorTypes } from 'types/module';
import DefaultText from 'components/atoms/texts/DefaultText';

function EmailErrorForm({
  email,
  emailReg,
  emailDone,
  emailErrorMsg,
  emailErrorStatus,
}: EmailErrorTypes) {
  return (
    <>
      {emailDone && emailErrorStatus === 200 ? (
        <>
          <DefaultText
            content="위 이메일로 인증번호가 발송되었습니댜."
            fontSize={1.2}
          />
          <DefaultText
            content="메일이 없다면, 스팸메일함을 확인해주세요."
            fontSize={1.2}
          />
        </>
      ) : (!email || emailReg) && !emailErrorStatus ? (
        <DefaultText
          content="위 이메일로 인증번호가 발송됩니다."
          fontSize={1.2}
        />
      ) : !emailReg && !emailErrorStatus ? (
        <DefaultText
          content="이메일을 정확히 입력해주세요."
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      ) : emailErrorStatus === 400 ? (
        <DefaultText
          content={emailErrorMsg}
          align="left"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      ) : (
        <DefaultText
          content="위 이메일로 인증번호가 발송됩니다."
          fontSize={1.2}
        />
      )}
    </>
  );
}

export default EmailErrorForm;
