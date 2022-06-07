import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Toast } from 'lib/Toast';
import DefaultButton from 'components/Button/DefaultButton';
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
    Toast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <Wrapper isSign={isSign}>
        <Link to="/">ONEWEEKBOOK</Link>
        <ButtonWrapper isSign={isSign}>
          {sessionStorage.getItem('accessToken') ? (
            <>
              <Link to="/myPage">
                <DefaultButton
                  pc={[90, 35]}
                  isHover
                  hoverBgColor="white"
                  hoverColor="#1e90ff"
                  bgColor="#1e90ff"
                  color="white"
                  fontSize={[14, 14]}
                  fontWeight={600}
                  title="마이페이지"
                />
              </Link>
              <Link to="/">
                <DefaultButton
                  onClick={logoutClick}
                  pc={[90, 35]}
                  isHover
                  hoverBgColor="white"
                  hoverColor="#1e90ff"
                  bgColor="#1e90ff"
                  color="white"
                  margin={[0, 0, 0, 10]}
                  fontSize={[14, 14]}
                  fontWeight={600}
                  title="로그아웃"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <DefaultButton
                  pc={[90, 35]}
                  isHover
                  hoverBgColor="white"
                  hoverColor="#1e90ff"
                  bgColor="#1e90ff"
                  color="white"
                  fontSize={[14, 14]}
                  fontWeight={600}
                  title="회원가입"
                />
              </Link>
              <Link to="/sign-in">
                <DefaultButton
                  pc={[90, 35]}
                  isHover
                  hoverBgColor="white"
                  hoverColor="#1e90ff"
                  bgColor="#1e90ff"
                  color="white"
                  margin={[0, 0, 0, 10]}
                  fontSize={[14, 14]}
                  fontWeight={600}
                  title="로그인"
                />
              </Link>
            </>
          )}
        </ButtonWrapper>
        <MobileButton isSign={isSign} onClick={toggleIsOn}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/func/header-menu-burger.png`}
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
    border: solid 2px white;
    border-radius: 7px;
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
