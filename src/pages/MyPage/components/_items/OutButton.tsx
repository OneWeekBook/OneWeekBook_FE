import React from 'react';
import styled from 'styled-components';

type PropsType = {
  removeToggleIsOn: () => void;
};

function OutButton({ removeToggleIsOn }: PropsType) {
  return (
    <Wrapper>
      <button onClick={removeToggleIsOn} type="button">
        회원 탈퇴
      </button>
    </Wrapper>
  );
}

export default OutButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border: none;
    background-color: white;
    font-size: 16px;
  }
`;
