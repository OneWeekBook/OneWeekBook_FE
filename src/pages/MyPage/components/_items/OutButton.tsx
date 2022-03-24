import React from 'react';
import styled from 'styled-components';

function OutButton() {
  return (
    <Wrapper>
      <button type="button">회원 탈퇴</button>
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
