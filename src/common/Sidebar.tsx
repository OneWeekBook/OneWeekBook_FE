import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SidebarTypes } from 'types/common';
import { AuthInit } from 'redux/reducers/AuthUser';
import useToggle from 'hooks/useToggle';
import useRouter from 'hooks/useRouter';
import useAuthLink from 'hooks/useAuthLink';
import { PATH_URL } from 'constants/path';
import { menuItems } from 'constants/content';
import { showToast } from 'common/Toast';
import NoticeModal from 'common/DefaultModal';
import SideBarLink from 'components/atoms/links/SideBarLink';

function Sidebar({ toggle, handleToggle }: SidebarTypes) {
  const dispatch = useDispatch();
  const { routeTo, currentPath } = useRouter();

  const [modalToggle, handleModalToggle] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  const handleMoveLink = (link: string) => {
    routeTo(link, link === currentPath);
    handleToggle();
  };

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    showToast('info', '로그아웃 되었습니다.');
    routeTo(PATH_URL.MAIN, true);
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
            handleClick={() => handleMoveLink(PATH_URL.USER)}
            content="마이페이지"
          />
        </>
      ) : (
        <>
          <SideBarLink
            handleClick={() => handleMoveLink(PATH_URL.SIGN_IN)}
            content="로그인"
          />
          <SideBarLink
            handleClick={() => handleMoveLink(PATH_URL.SIGN_UP)}
            content="회원가입"
          />
        </>
      )}
      {menuItems.map((item) => (
        <SideBarLink
          key={item.id}
          handleClick={() =>
            handleAuthClick(
              item.link,
              [PATH_URL.LIBRARY],
              handleModalToggle,
              handleToggle,
            )
          }
          content={item.title}
        />
      ))}
      {modalToggle && (
        <NoticeModal
          content="내 서재로 가시려면 로그인을 하셔야합니다."
          contentSize={1.8}
          subContent="로그인 하시겠습니까?"
          width={500}
          height={250}
          handleToggle={handleModalToggle}
          close
          okButtonTitle="로그인"
          cancelButtonTitle="나중에..."
          handleOkClick={() => handleMoveLink(PATH_URL.SIGN_IN)}
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
