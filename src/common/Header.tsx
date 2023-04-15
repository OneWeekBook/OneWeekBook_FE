import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthInit } from 'redux/reducers/AuthUser';
import { Toast } from 'lib/Toast';
import Container from './Container';

type PropsType = {
  toggleIsOn?: () => void;
};

function Header({ toggleIsOn }: PropsType) {
  const location = useLocation();
  const dispatch = useDispatch();
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
    dispatch(AuthInit());
    Toast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <Wrapper isSign={isSign}>
        <Logo to="/">ONEWEEKBOOK</Logo>
        <ButtonWrapper isSign={isSign}>
          {sessionStorage.getItem('accessToken') ? (
            <>
              <Link to="/myPage">마이페이지</Link>
              <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
              <Link to="/" onClick={logoutClick}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">회원가입</Link>
              <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
              <Link to="/sign-in">로그인</Link>
            </>
          )}
        </ButtonWrapper>
        <MobileButton isSign={isSign} onClick={toggleIsOn}>
          <i className="sprite sprite-header-menu-burger" />
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
  color: ${({ theme }) => theme.color.COLOR_MAIN};
  justify-content: ${({ isSign }) => (isSign ? 'center' : 'space-between')};
  margin: 10px 0;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: 10px auto;
    width: 90%;
  }
`;

const Logo = styled(Link)`
  font-size: 32px;
  font-weight: 800;
`;

const ButtonWrapper = styled.div<{ isSign: boolean }>`
  display: ${({ isSign }) => (isSign ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const MobileButton = styled.button<{ isSign: boolean }>`
  background-color: #f07055;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  border: none;
  display: none;
  transition: all 0.5s;
  &:hover {
    background-color: #ffa07a;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: ${({ isSign }) => (isSign ? 'none' : 'block')};
  }
`;
