import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AuthInit } from 'redux/reducers/AuthUser';
import { Toast } from 'lib/Toast';
import useToggle from 'hooks/useToggle';
import useAuthLink from 'hooks/useAuthLink';
import DefaultButton from 'components/Button/DefaultButton';
import NoticeModal from 'components/Modal';
import { useEffect } from 'react';
import { NavItems } from './Nav';

type PropsTypes = {
  toggle: boolean;
  toggleIsOn: () => void;
};

function Sidebar({ toggle, toggleIsOn }: PropsTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalToggle, isModalToggleOn] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    Toast('info', '로그아웃 되었습니다.');
    toggleIsOn();
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [toggle]);

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
            <Link to="/myPage">
              <DefaultButton
                onClick={toggleIsOn}
                pc={[0, 50]}
                isHover
                hoverColor="#1e90ff"
                padding={[0, 20, 0, 0]}
                fontSize={[20, 20]}
                fontWeight={600}
                title="마이페이지"
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
            onClick={() =>
              handleAuthClick(
                item.link,
                ['/my-library'],
                isModalToggleOn,
                toggleIsOn,
              )
            }
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
      {modalToggle && (
        <NoticeModal
          title="내 서재로 가시려면 로그인을 하셔야합니다."
          titleSize={[18, 16]}
          subTitle="로그인 하시겠습니까?"
          subTitleSize={[18, 16]}
          width={500}
          height={250}
          handleToggle={isModalToggleOn}
          close
          isOkBtn
          okBtnTitle="로그인"
          handleOkClick={() => {
            toggleIsOn();
            navigate('/sign-in');
          }}
          isCancelBtn
          cancelBtnTitle="나중에..."
          handleCanCelClick={isModalToggleOn}
        />
      )}
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
