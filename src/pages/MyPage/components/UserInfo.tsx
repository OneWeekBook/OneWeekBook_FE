import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Rank from './_items/Rank';
import NameButton from './_items/NameButton';
import OutButton from './_items/OutButton';

function UserInfo() {
  const { user } = useSelector((state: any) => state.authUser);

  console.log(user);

  return (
    <Wrapper>
      <NameButton nickName={user.nick} />
      <Rank role={user.role} />
      <OutButton />
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  border: 3px solid #1e90ff;
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 250px;
  margin: 100px auto 0;
  padding: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;
