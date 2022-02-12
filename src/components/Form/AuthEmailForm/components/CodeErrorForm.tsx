import ErrorForm from 'components/Form/ErrorForm';
import React from 'react';
import styled from 'styled-components';

type PropsTypes = {
  code: string;
  codeReg: boolean;
  codeErrorMsg: string;
  codeErrorStatus: number;
};

function CodeErrorForm({
  code,
  codeReg,
  codeErrorMsg,
  codeErrorStatus,
}: PropsTypes) {
  return (
    <>
      {(!code || codeReg) && !codeErrorStatus ? (
        <Desc>인증번호를 입력하면 다음으로 넘어갑니다.</Desc>
      ) : !codeReg && !codeErrorStatus ? (
        <ErrorForm error="인증번호는 6자리 입니다." align="left" />
      ) : (
        codeErrorStatus && <ErrorForm error={codeErrorMsg} align="left" />
      )}
    </>
  );
}

export default CodeErrorForm;

const Desc = styled.p`
  padding: 5px;
  font-size: 12px;
  text-align: left;
`;
