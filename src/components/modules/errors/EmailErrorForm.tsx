import DefaultText from 'components/atoms/texts/DefaultText';
import ErrorText from 'components/atoms/texts/ErrorText';

interface EmailErrorProps {
  email: string;
  emailReg: boolean;
  emailDone: boolean;
  emailErrorMsg: string;
  emailErrorStatus: number;
}

function EmailErrorForm({
  email,
  emailReg,
  emailDone,
  emailErrorMsg,
  emailErrorStatus,
}: EmailErrorProps) {
  return (
    <>
      {emailDone && emailErrorStatus === 200 ? (
        <DefaultText
          content="위 이메일로 인증번호가 발송되었습니댜."
          subContent="메일이 없다면, 스팸메일함을 확인해주세요."
          fontSize={1.2}
        />
      ) : (!email || emailReg) && !emailErrorStatus ? (
        <DefaultText
          content="위 이메일로 인증번호가 발송됩니다."
          fontSize={1.2}
        />
      ) : !emailReg && !emailErrorStatus ? (
        <ErrorText error="이메일을 정확히 입력해주세요." align="left" />
      ) : emailErrorStatus === 400 ? (
        <ErrorText error={emailErrorMsg} align="left" />
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
