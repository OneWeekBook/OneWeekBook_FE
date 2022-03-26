import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import ChangeNickModal from '../modal/ChangeNickModal';
import ChangePassModal from '../modal/ChangePassModal';

type PropsType = {
  nickName: string;
};

function NameButton({ nickName }: PropsType) {
  const [nickToggle, nickToggleIsOn] = useToggle(false);
  const [passToggle, passToggleIsOn] = useToggle(false);
  return (
    <Wrapper>
      <NickName>닉네임: {nickName}</NickName>
      <ButtonWrapper>
        <button onClick={nickToggleIsOn} type="button">
          닉네임 변경
        </button>
        <button onClick={passToggleIsOn} type="button">
          비밀번호 변경
        </button>
      </ButtonWrapper>
      {nickToggle && <ChangeNickModal nickToggleIsOn={nickToggleIsOn} />}
      {passToggle && <ChangePassModal passToggleIsOn={passToggleIsOn} />}
    </Wrapper>
  );
}

export default NameButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 425px) {
    display: block;
  }
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
    font-size: 14px;
    font-weight: 600;
    background-color: #1e90ff;
    border: none;
    border-radius: 5px;
    color: white;
    :hover {
      background-color: #08c1e9;
    }
    :last-child {
      margin-left: 10px;
    }
  }
  @media (max-width: 425px) {
    margin-top: 10px;
  }
`;
