import { User } from 'db/user';
import React from 'react';
import styled from 'styled-components';

function NameButton() {
  return (
    <Wrapper>
      <NickName>닉네임: {User.nickname}</NickName>
      <ButtonWrapper>
        <button type="button">닉네임 변경</button>
        <button type="button">비밀번호 변경</button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default NameButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NickName = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  button {
    width: 100px;
    height: 40px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    background-color: #1e90ff;
    border: none;
    border-radius: 5px;
    color: white;
    :hover {
      background-color: #08c1e9;
    }
  }
`;
