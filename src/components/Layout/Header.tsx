import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../Container';

function Header() {
  const location = useLocation();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <Wrapper>
        {location.pathname === '/sign-up' ||
        location.pathname === '/sign-in' ? (
          <SignTop>
            <Link to="/">ONEWEEKBOOK</Link>
          </SignTop>
        ) : (
          <Top>
            <Link to="/">ONEWEEKBOOK</Link>
            {sessionStorage.getItem('accessToken') ? (
              <ButtonWrapper>
                <Link to="/book">
                  <button type="button">내서재</button>
                </Link>
                <Link to="/">
                  <button type="button" onClick={logoutClick}>
                    로그아웃
                  </button>
                </Link>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <Link to="/sign-up">
                  <button type="button">회원가입</button>
                </Link>
                <Link to="/sign-in">
                  <button type="button">로그인</button>
                </Link>
              </ButtonWrapper>
            )}
          </Top>
        )}
      </Wrapper>
    </Container>
  );
}

export default Header;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: auto;
    width: 90%;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  a {
    color: white;
    font-size: 28px;
    font-weight: 800;
    text-decoration: none;
    @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
      font-size: 24px;
    }
  }
`;

const SignTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  a {
    color: white;
    font-size: 28px;
    font-weight: 800;
    text-decoration: none;
    @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
      font-size: 24px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
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
