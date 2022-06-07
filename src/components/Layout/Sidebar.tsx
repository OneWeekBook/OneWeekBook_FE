import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Toast } from 'lib/Toast';
import DefaultButton from 'components/Button/DefaultButton';
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
    Toast('info', '로그아웃 되었습니다.');
    toggleIsOn();
  };

  return (
    <Wrapper isToggle={toggle}>
      <ButtonWrapper>
        {sessionStorage.getItem('accessToken') ? (
          <>
            <Link to="/">
              <DefaultButton
                onClick={logoutClick}
                pc={[0, 50]}
                isHover
                hoverColor="#1e90ff"
                padding={[0, 20, 0, 0]}
                fontSize={[20, 20]}
                fontWeight={600}
                title="로그아웃"
              />
            </Link>
            <Link to="/my-library">
              <DefaultButton
                onClick={toggleIsOn}
                pc={[0, 50]}
                isHover
                hoverColor="#1e90ff"
                padding={[0, 20, 0, 0]}
                fontSize={[20, 20]}
                fontWeight={600}
                title="내 서재"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <DefaultButton
                onClick={toggleIsOn}
                pc={[0, 50]}
                isHover
                hoverColor="#1e90ff"
                padding={[0, 20, 0, 0]}
                fontSize={[20, 20]}
                fontWeight={600}
                title="로그인"
              />
            </Link>
            <Link to="/sign-up">
              <DefaultButton
                onClick={toggleIsOn}
                pc={[0, 50]}
                isHover
                hoverColor="#1e90ff"
                padding={[0, 20, 0, 0]}
                fontSize={[20, 20]}
                fontWeight={600}
                title="회원가입"
              />
            </Link>
          </>
        )}
        {NavItems.map((item) => (
          <DefaultButton
            key={item.id}
            onClick={() => handleClick(item.link)}
            pc={[0, 50]}
            isHover
            hoverColor="#1e90ff"
            padding={[0, 20, 0, 0]}
            fontSize={[20, 20]}
            fontWeight={600}
            title={item.title}
          />
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
    text-align: right;
    border-bottom: 1px solid #e6e6e6;
  }
`;
