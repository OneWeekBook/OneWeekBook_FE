import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SidebarTypes } from 'types/common';
import { AppStateType } from 'redux/reducers';
import { authInit } from 'redux/reducers/authUserReducer';
import useToggle from 'hooks/useToggle';
import useRouter from 'hooks/useRouter';
import useAuthLink from 'hooks/useAuthLink';
import { removeAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import { PATH_URL } from 'constants/path';
import { menuItems } from 'constants/content';
import { showToast } from 'common/Toast';
import NoticeModal from 'common/DefaultModal';
import SideBarLink from 'components/atoms/links/SideBarLink';
import { MENU_IMAGE } from 'constants/image';

function Sidebar({ toggle, handleToggle }: SidebarTypes) {
  const dispatch = useDispatch();
  const { routeTo, currentPath } = useRouter();
  const [modalToggle, handleModalToggle] = useToggle(false);
  const { handleAuthClick } = useAuthLink();
  const isAuth = useSelector((state: AppStateType) => state.authUser.isAuth);

  const handleAuthPathCheck = () => {
    const link = [PATH_URL.LIBRARY, PATH_URL.USER];
    return link.includes(window.location.pathname);
  };

  const handleMoveLink = (link: string) => {
    routeTo(link, link === currentPath);
    handleToggle();
  };

  const handleSignOut = () => {
    removeAccessTokenFromSessionStorage();
    dispatch(authInit());
    showToast('info', '로그아웃 되었습니다.');
    if (handleAuthPathCheck()) routeTo(PATH_URL.MAIN, true);
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
    <SidbarOuter isToggle={toggle}>
      <SideBarBody>
        <SideBarLink
          handleClick={handleToggle}
          content="뒤로가기"
          imageSrc={MENU_IMAGE.BACK}
        />
        {isAuth ? (
          <>
            <SideBarLink
              handleClick={handleSignOut}
              content="로그아웃"
              imageSrc={MENU_IMAGE.SIGN_OUT}
            />
            <SideBarLink
              handleClick={() => handleMoveLink(PATH_URL.USER)}
              content="마이페이지"
              imageSrc={MENU_IMAGE.MY_PAGE}
            />
          </>
        ) : (
          <>
            <SideBarLink
              handleClick={() => handleMoveLink(PATH_URL.SIGN_IN)}
              content="로그인"
              imageSrc={MENU_IMAGE.SIGN_IN}
            />
            <SideBarLink
              handleClick={() => handleMoveLink(PATH_URL.SIGN_UP)}
              content="회원가입"
              imageSrc={MENU_IMAGE.SIGN_UP}
            />
          </>
        )}
        {menuItems.map((item) => (
          <SideBarLink
            key={item.id}
            handleClick={() =>
              handleAuthClick(
                item.link.split('?')[0],
                [PATH_URL.LIBRARY],
                handleModalToggle,
                handleToggle,
              )
            }
            content={item.title}
            imageSrc={item.img}
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
            handleCancelClick={handleModalToggle}
          />
        )}
      </SideBarBody>
    </SidbarOuter>
  );
}

export default Sidebar;

const SidbarOuter = styled.div<{ isToggle: boolean }>`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 100;
  margin-top: -10px;
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

const SideBarBody = styled.div`
  right: 0;
  background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  width: 300px;
  height: 100vh;
`;
