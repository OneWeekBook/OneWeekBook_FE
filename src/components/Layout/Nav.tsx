import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import useAuthLink from 'hooks/useAuthLink';
import NoticeModal from 'components/Modal';
import Container from '../Container';

export const NavItems = [
  {
    id: 1,
    title: '홈',
    link: '/',
    img: `sprite sprite-nav-none-home`,
    clickImg: `sprite sprite-nav-done-home`,
  },
  {
    id: 2,
    title: '내 서재',
    link: '/my-library',
    img: `sprite sprite-nav-none-book`,
    clickImg: `sprite sprite-nav-done-book`,
  },
  {
    id: 3,
    title: '카테고리',
    link: '/category',
    img: `sprite sprite-nav-none-category`,
    clickImg: `sprite sprite-nav-done-category`,
  },
  {
    id: 4,
    title: '리뷰',
    link: '/review',
    img: `sprite sprite-nav-none-review`,
    clickImg: `sprite sprite-nav-done-review`,
  },
];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalToggle, isModalToggleOn] = useToggle(false);
  const { handleAuthClick } = useAuthLink();

  return (
    <>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
        <Container as="nav">
          <NavWrapper>
            {NavItems.map((item) => (
              <NavItem
                key={item.id}
                onClick={() =>
                  handleAuthClick(item.link, ['/my-library'], isModalToggleOn)
                }
              >
                <i
                  className={
                    item.link === `/${location.pathname.split('/')[1]}`
                      ? item.clickImg
                      : item.img
                  }
                />
                &nbsp;{item.title}
              </NavItem>
            ))}
          </NavWrapper>
        </Container>
      )}
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
    </>
  );
}

export default Nav;

const NavWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  width: 100%;
  a {
    text-decoration: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    margin: auto;
    width: 90%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const NavItem = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: none;
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 35px;
  font-size: 16px;
  margin: 0 10px 0 0;
  color: white;
  cursor: pointer;
  img {
    margin-right: 2px;
  }
`;
