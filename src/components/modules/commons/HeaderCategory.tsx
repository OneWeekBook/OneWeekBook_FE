import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import useRouter from 'hooks/useRouter';
import useAuthLink from 'hooks/useAuthLink';
import { menuItems } from 'constants/content';
import { PATH_URL } from 'constants/path';
import NoticeModal from 'common/DefaultModal';
import MenuButton from 'components/atoms/buttons/MenuButton';

function HeaderMainCategory() {
  const { routeTo, currentPath } = useRouter();
  const [modalToggle, handleModalToggle] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  return (
    <HeaderCategoryModule>
      {menuItems.map((item) => (
        <MenuButton
          key={item.id}
          src={
            item.link === `/${currentPath.split('/')[1]}`
              ? item.clickImg
              : item.img
          }
          imgSize={30}
          content={item.title}
          handleClick={() =>
            handleAuthClick(item.link, [PATH_URL.LIBRARY], handleModalToggle)
          }
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
          cancelButtonTitle="나중에"
          handleOkClick={() => routeTo(PATH_URL.SIGN_IN)}
          handleCancelClick={handleModalToggle}
        />
      )}
    </HeaderCategoryModule>
  );
}

export default HeaderMainCategory;

const HeaderCategoryModule = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;
