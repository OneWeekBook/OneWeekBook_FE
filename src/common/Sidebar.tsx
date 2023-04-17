import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AuthInit } from 'redux/reducers/AuthUser';
import { Toast } from 'lib/Toast';
import useToggle from 'hooks/useToggle';
import useAuthLink from 'hooks/useAuthLink';
import NoticeModal from 'components/Modal';
import { useEffect } from 'react';
import { NavItems } from 'contain/mainmenu';
import SideBarLink from 'components/atoms/links/SideBarLink';

type PropsTypes = {
  toggle: boolean;
  handleToggle: () => void;
};

function Sidebar({ toggle, handleToggle }: PropsTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalToggle, handleModalToggle] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  const handleMoveLink = (link: string) => {
    navigate(link, { replace: link === location.pathname });
    handleToggle();
  };

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    Toast('info', '로그아웃 되었습니다.');
    navigate('/', { replace: true });
    handleToggle();
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [toggle]);

  return (
    <SideBarBody isToggle={toggle}>
      {sessionStorage.getItem('accessToken') ? (
        <>
          <SideBarLink handleClick={logoutClick} content="로그아웃" />
          <SideBarLink
            handleClick={() => handleMoveLink('/myPage')}
            content="마이페이지"
          />
        </>
      ) : (
        <>
          <SideBarLink
            handleClick={() => handleMoveLink('/sign-in')}
            content="로그인"
          />
          <SideBarLink
            handleClick={() => handleMoveLink('/sign-up')}
            content="회원가입"
          />
        </>
      )}
      {NavItems.map((item) => (
        <SideBarLink
          key={item.id}
          handleClick={() =>
            handleAuthClick(
              item.link,
              ['/my-library'],
              handleModalToggle,
              handleToggle,
            )
          }
          content={item.title}
        />
      ))}
      {modalToggle && (
        <NoticeModal
          title="내 서재로 가시려면 로그인을 하셔야합니다."
          titleSize={[18, 16]}
          subTitle="로그인 하시겠습니까?"
          subTitleSize={[18, 16]}
          width={500}
          height={250}
          handleToggle={handleModalToggle}
          close
          isOkBtn
          okBtnTitle="로그인"
          handleOkClick={() => handleMoveLink('/sign-in')}
          isCancelBtn
          cancelBtnTitle="나중에..."
          handleCanCelClick={handleModalToggle}
        />
      )}
    </SideBarBody>
  );
}

export default Sidebar;

const SideBarBody = styled.div<{ isToggle: boolean }>`
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
