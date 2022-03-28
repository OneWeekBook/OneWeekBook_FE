import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavItems } from './Nav';

type PropsTypes = {
  toggle: boolean;
  toggleIsOn: () => void;
};

function Sidebar({ toggle, toggleIsOn }: PropsTypes) {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    if (link === '/myPage' && sessionStorage.getItem('accessToken')) {
      navigate(link);
    } else if (link === '/myPage' && !sessionStorage.getItem('accessToken')) {
      if (
        link === '/myPage' &&
        confirm(
          '마이페이지로 가시려면 로그인을 하셔야합니다.\n로그인 하시겠습니까?',
        )
      ) {
        navigate('/sign-in');
      }
    } else {
      navigate(link);
    }
    toggleIsOn();
  };

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다.');
    toggleIsOn();
  };

  return (
    <Wrapper isToggle={toggle}>
      <ButtonWrapper>
        {sessionStorage.getItem('accessToken') ? (
          <>
            <Link to="/">
              <SidebarButton onClick={logoutClick}>로그아웃</SidebarButton>
            </Link>
            <Link to="/book">
              <SidebarButton onClick={toggleIsOn}>내 서재</SidebarButton>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <SidebarButton onClick={toggleIsOn}>로그인</SidebarButton>
            </Link>
            <Link to="/sign-up">
              <SidebarButton onClick={toggleIsOn}>회원가입</SidebarButton>
            </Link>
          </>
        )}
        {NavItems.map((item) => (
          <SidebarButton key={item.id} onClick={() => handleClick(item.link)}>
            {item.title}
          </SidebarButton>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div<{ isToggle: boolean }>`
  background-color: white;
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100vh;
  right: ${({ isToggle }) => (isToggle ? 0 : -100)}%;
  @media (min-width: ${({ theme: { device } }) =>
      device.mobile.maxWidth + 1}px) {
    display: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    visibility: visible;
    transition-duration: 0.5s;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  a,
  button {
    width: 100%;
    text-align: right;
    background-color: white;
  }
`;

const SidebarButton = styled.button`
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  font-size: 20px;
  font-weight: 600;
  padding-right: 50px;
  height: 50px;
`;
