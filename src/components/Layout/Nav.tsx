import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../Container';

const NavItems = [
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
];

function Nav() {
  const [toggle, setToggle] = useState<boolean>(false);
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
        <Container as="nav">
          <NavWrapper>
            {NavItems.map((item) => (
              <Link to={item.link} key={item.id}>
                <NavItem onClick={() => setToggle(!toggle)}>
                  {item.link === location.pathname ? (
                    <img
                      src={item.clickImg}
                      alt={item.title}
                      width={35}
                      height={35}
                    />
                  ) : (
                    <img
                      src={item.img}
                      alt={item.title}
                      width={35}
                      height={35}
                    />
                  )}
                  <p>{item.title}</p>
                </NavItem>
              </Link>
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
  a {
    text-decoration: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 35px;
  p {
    font-size: 18px;
    margin: 0 10px 0 0;
    color: white;
  }
`;
