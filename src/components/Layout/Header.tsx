import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../Container';

function Header() {
  const location = useLocation();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
  };

  return (
    <>
      {location.pathname === '/sign-up' || location.pathname === '/sign-in' ? (
        <Container as="header">
          <SignTop>
            <Link to="/">ONEWEEKBOOK</Link>
          </SignTop>
        </Container>
      ) : (
        <Container as="header">
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
        </Container>
      )}
    </>
  );
}

export default Header;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  a {
    color: white;
    font-size: 28px;
    font-weight: 800;
    line-height: 48px;
    text-decoration: none;
  }
`;

const SignTop = styled.div`
  display: flex;
  justify-content: center;
  a {
    color: white;
    font-size: 28px;
    font-weight: 800;
    line-height: 48px;
    text-decoration: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 100px;
    margin-left: 10px;
    background-color: #1e90ff;
    border: solid 2px white;
    border-radius: 7px;
    color: white;
    font-size: 18px;
    height: 40px;
    :hover {
      background-color: white;
      color: #1e90ff;
      font-weight: 800;
    }
  }
`;
