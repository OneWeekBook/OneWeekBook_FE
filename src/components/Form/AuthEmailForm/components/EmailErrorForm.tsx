import styled from 'styled-components';
import ErrorForm from 'components/Form/ErrorForm';

type ErrorTypes = {
  email: string;
  emailReg: boolean;
  emailDone: boolean;
  emailErrorMsg: string;
  emailErrorStatus: number;
};

function EmailErrorForm({
  email,
  emailReg,
  emailDone,
  emailErrorMsg,
  emailErrorStatus,
}: ErrorTypes) {
  return (
    <>
      {emailDone && emailErrorStatus === 200 ? (
        <Desc>
          위 이메일로 인증번호가 발송되었습니댜. <br /> 메일이 없다면, 스팸
          메일함을 확인해주세요.
        </Desc>
      ) : (!email || emailReg) && !emailErrorStatus ? (
        <Desc>위 이메일로 인증번호가 발송됩니다.</Desc>
      ) : !emailReg && !emailErrorStatus ? (
        <ErrorForm error="이메일을 정확히 입력해주세요." align="left" />
      ) : emailErrorStatus === 400 ? (
        <ErrorForm error={emailErrorMsg} align="left" />
      ) : (
        <Desc>위 이메일로 인증번호가 발송됩니다.</Desc>
      )}
    </>
  );
}

export default EmailErrorForm;

const Desc = styled.p`
  padding: 5px;
  font-size: 12px;
  text-align: left;
`;
