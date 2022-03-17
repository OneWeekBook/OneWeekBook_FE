import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../Container';

export const NavItems = [
  {
    id: 1,
    title: '홈',
    link: '/',
    img: `${process.env.PUBLIC_URL}/assets/nav-none-home.png`,
    clickImg: `${process.env.PUBLIC_URL}/assets/nav-done-home.png`,
  },
  {
    id: 2,
    title: '알림',
    link: '/notice',
    img: `${process.env.PUBLIC_URL}/assets/nav-none-notice.png`,
    clickImg: `${process.env.PUBLIC_URL}/assets/nav-done-notice.png`,
  },
  {
    id: 3,
    title: '마이페이지',
    link: '/myPage',
    img: `${process.env.PUBLIC_URL}/assets/nav-none-myPage.png`,
    clickImg: `${process.env.PUBLIC_URL}/assets/nav-done-myPage.png`,
  },
  {
    id: 4,
    title: '카테고리',
    link: '/category',
    img: `${process.env.PUBLIC_URL}/assets/nav-none-category.png`,
    clickImg: `${process.env.PUBLIC_URL}/assets/nav-done-category.png`,
  },
];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState<boolean>(false);

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
    setToggle(!toggle);
  };

  return (
    <>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
        <Container as="nav">
          <NavWrapper>
            {NavItems.map((item) => (
              <NavItem key={item.id} onClick={() => handleClick(item.link)}>
                {item.link === location.pathname ? (
                  <img
                    src={item.clickImg}
                    alt={item.title}
                    width={30}
                    height={30}
                  />
                ) : (
                  <img src={item.img} alt={item.title} width={30} height={30} />
                )}
                {item.title}
              </NavItem>
            ))}
          </NavWrapper>
        </Container>
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
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
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
  img {
    margin-right: 2px;
  }
`;
