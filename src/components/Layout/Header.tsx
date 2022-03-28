import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../Container';

type PropsType = {
  toggleIsOn?: () => void;
};

function Header({ toggleIsOn }: PropsType) {
  const location = useLocation();
  const [isSign, setIsSign] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === '/sign-up' || location.pathname === '/sign-in') {
      setIsSign(true);
    } else {
      setIsSign(false);
    }
    return () => {
      setIsSign(false);
    };
  }, [location.pathname]);

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <Wrapper isSign={isSign}>
        <Link to="/">ONEWEEKBOOK</Link>
        <ButtonWrapper isSign={isSign}>
          {sessionStorage.getItem('accessToken') ? (
            <>
              <Link to="/myPage">
                <button type="button">마이페이지</button>
              </Link>
              <Link to="/">
                <button type="button" onClick={logoutClick}>
                  로그아웃
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <button type="button">회원가입</button>
              </Link>
              <Link to="/sign-in">
                <button type="button">로그인</button>
              </Link>
            </>
          )}
        </ButtonWrapper>
        <MobileButton isSign={isSign} onClick={toggleIsOn}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-menu-burger.png`}
            alt="sidebar button"
          />
        </MobileButton>
      </Wrapper>
    </Container>
  );
}

export default Header;

const Wrapper = styled.div<{ isSign: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ isSign }) => (isSign ? 'center' : 'space-between')};
  margin: 10px 0;
  a {
    color: white;
    font-size: 28px;
    font-weight: 800;
    text-decoration: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: 10px auto;
    width: 90%;
    a {
      font-size: 24px;
    }
  }
`;

const ButtonWrapper = styled.div<{ isSign: boolean }>`
  display: ${({ isSign }) => (isSign ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  button {
    width: 90px;
    margin-left: 10px;
    background-color: #1e90ff;
    border: solid 2px white;
    border-radius: 7px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    height: 35px;
    :hover {
      background-color: white;
      color: #1e90ff;
      font-weight: 800;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const MobileButton = styled.button<{ isSign: boolean }>`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  display: none;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: ${({ isSign }) => (isSign ? 'none' : 'block')};
  }
`;
