import React, { useState } from 'react';
import styled from 'styled-components';

const NavItems = [
  {
    id: 0,
    desc: '좋아요',
    img: `${process.env.PUBLIC_URL}/assets/my-library-nav-like.svg`,
  },
  {
    id: 1,
    desc: '읽는중',
    img: `${process.env.PUBLIC_URL}/assets/my-library-nav-read.svg`,
  },
  {
    id: 2,
    desc: '다읽은',
    img: `${process.env.PUBLIC_URL}/assets/my-library-nav-done.svg`,
  },
];

function MyLibraryNav() {
  const [navId, setNavId] = useState<number>(0);
  const handleClick = (id: number) => setNavId(id);

  return (
    <>
      <Wrapper>
        {NavItems.map((item) => (
          <NavItem
            key={item.id}
            isSelected={item.id === navId}
            onClick={() => handleClick(item.id)}
          >
            <img src={item.img} alt="nav button" width={30} height={30} />
            <p>{item.desc}</p>
          </NavItem>
        ))}
      </Wrapper>
    </>
  );
}

export default MyLibraryNav;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
  margin: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const NavItem = styled.button<{ isSelected: boolean }>`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
  p {
    color: ${({ isSelected }) => (isSelected ? '#1e90ff' : '#000000')};
  }
  :hover {
    p {
      color: #1e90ff;
    }
    box-shadow: 1px 2px 3px #000;
  }
`;
