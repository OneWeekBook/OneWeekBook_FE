import { CodeErrorTypes } from 'types/module';
import ErrorText from 'components/atoms/texts/ErrorText';
import DefaultText from 'components/atoms/texts/DefaultText';

function CodeErrorForm({
  code,
  codeReg,
  codeErrorMsg,
  codeErrorStatus,
}: CodeErrorTypes) {
  return (
    <>
      {(!code || codeReg) && !codeErrorStatus ? (
        <DefaultText
          content="인증번호를 입력하면 다음으로 넘어갑니다."
          fontSize={1.2}
        />
      ) : !codeReg && !codeErrorStatus ? (
        <ErrorText error="인증번호는 6자리 입니다." align="left" />
      ) : (
        codeErrorStatus && <ErrorText error={codeErrorMsg} align="left" />
      )}
    </>
  );
}

export default CodeErrorForm;
