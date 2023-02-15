import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { navDone, navLike, navRead } from 'redux/reducers/Func';
import { MyLibraryInit, MyLibraryRequest } from 'redux/reducers/MyLibrary';
import Nav from './Nav';

const NavItems = [
  {
    id: 0,
    desc: '좋아요',
    clickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/like-white.svg`,
    nonClickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/like.svg`,
  },
  {
    id: 1,
    desc: '읽는중',
    clickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/read-white.svg`,
    nonClickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/read.svg`,
  },
  {
    id: 2,
    desc: '다읽은',
    clickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/done-white.svg`,
    nonClickImg: `${process.env.PUBLIC_URL}/assets/myLibrary/done.svg`,
  },
];

function MyLibraryNav() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const navId = useSelector((state: AppStateType) => state.func.navId);

  useEffect(() => {
    if (user.id) dispatch(MyLibraryRequest({ progress: navId }));
    return () => {
      dispatch(MyLibraryInit());
    };
  }, [user, navId]);

  const navMoveClick = (curId: number) => {
    if (NavItems[0].id === curId) {
      dispatch(navLike());
    } else if (NavItems[1].id === curId) {
      dispatch(navRead());
    } else {
      dispatch(navDone());
    }
  };

  return (
    <>
      <NavWrapper>
        {NavItems.map((item) => (
          <NavItem
            key={item.id}
            isSelected={item.id === navId}
            onClick={() => navMoveClick(item.id)}
          >
            <img
              src={navId === item.id ? item.clickImg : item.nonClickImg}
              alt="nav button"
              width={22}
              height={22}
            />
            <p>{item.desc}</p>
          </NavItem>
        ))}
      </NavWrapper>
      <ComponentWrapper>
        <Nav id={navId} />
      </ComponentWrapper>
    </>
  );
}

export default MyLibraryNav;

const NavWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #f07055;
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;

const ComponentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 10px auto 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr;
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;

const NavItem = styled.button<{ isSelected: boolean }>`
  border-top: 2px solid #f07055;
  border-left: 2px solid #f07055;
  border-right: 2px solid #f07055;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
  background-color: ${({ isSelected }) => (isSelected ? '#f07055' : '#fff')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 150px;
  height: 40px;
  &:nth-child(n + 2) {
    margin-left: -2px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#f07055')};
  }
`;
