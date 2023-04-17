import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import useAuthLink from 'hooks/useAuthLink';
import Container from 'common/Container';
import NoticeModal from 'components/Modal';
import MenuButton from 'components/atoms/buttons/MenuButton';
import { NavItems } from 'contain/mainmenu';

function HeaderMainCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalToggle, isModalToggleOn] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  return (
    <Container as="nav">
      <MenuListWrapper>
        {NavItems.map((item) => (
          <MenuButton
            key={item.id}
            src={
              item.link === `/${location.pathname.split('/')[1]}`
                ? item.clickImg
                : item.img
            }
            imgSize={3}
            content={item.title}
            handleClick={() =>
              handleAuthClick(item.link, ['/my-library'], isModalToggleOn)
            }
          />
        ))}
      </MenuListWrapper>
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
          handleOkClick={() => navigate('/sign-in')}
          isCancelBtn
          cancelBtnTitle="나중에..."
          handleCanCelClick={isModalToggleOn}
        />
      )}
    </Container>
  );
}

export default HeaderMainCategory;

const MenuListWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: auto;
    width: 90%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;
