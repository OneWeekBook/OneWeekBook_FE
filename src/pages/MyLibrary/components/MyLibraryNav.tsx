import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { navDone, navLike, navRead } from 'redux/reducers/Func';
import { MyLibraryInit, MyLibraryRequest } from 'redux/reducers/MyLibrary';
import Nav from './Nav';

const NavItems = [
  {
    id: 0,
    desc: '좋아요',
    img: `${process.env.PUBLIC_URL}/assets/myLibrary/my-library-nav-like.svg`,
  },
  {
    id: 1,
    desc: '읽는중',
    img: `${process.env.PUBLIC_URL}/assets/myLibrary/my-library-nav-read.svg`,
  },
  {
    id: 2,
    desc: '다읽은',
    img: `${process.env.PUBLIC_URL}/assets/myLibrary/my-library-nav-done.svg`,
  },
];

function MyLibraryNav() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppStateType) => state.authUser);
  const { navId } = useSelector((state: AppStateType) => state.func);

  useEffect(() => {
    if (user.id)
      dispatch(MyLibraryRequest({ userId: user.id, progress: navId }));
    return () => {
      dispatch(MyLibraryInit());
    };
  }, [user, navId]);

  return (
    <>
      <Wrapper>
        <NavItem
          isSelected={NavItems[0].id === navId}
          onClick={() => dispatch(navLike())}
        >
          <img src={NavItems[0].img} alt="nav button" width={30} height={30} />
          <p>{NavItems[0].desc}</p>
        </NavItem>
        <NavItem
          isSelected={NavItems[1].id === navId}
          onClick={() => dispatch(navRead())}
        >
          <img src={NavItems[1].img} alt="nav button" width={30} height={30} />
          <p>{NavItems[1].desc}</p>
        </NavItem>
        <NavItem
          isSelected={NavItems[2].id === navId}
          onClick={() => dispatch(navDone())}
        >
          <img src={NavItems[2].img} alt="nav button" width={30} height={30} />
          <p>{NavItems[2].desc}</p>
        </NavItem>
      </Wrapper>
      <Nav id={navId} userId={user.id} />
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
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;

const NavItem = styled.button<{ isSelected: boolean }>`
  border: none;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
  transition: 0.5s;
  p {
    color: ${({ isSelected }) => (isSelected ? '#1e90ff' : '#000000')};
  }
  :hover {
    p {
      color: #1e90ff;
    }
    box-shadow: -10px -10px 10px -5px rgba(25, 42, 70, 0.2);
  }
`;
