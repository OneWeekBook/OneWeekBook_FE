import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { LibraryMenuTypes } from 'types/module';
import { navDone, navLike, navRead } from 'redux/reducers/Func';
import { MyLibraryInit, MyLibraryRequest } from 'redux/reducers/MyLibrary';
import { LibraryMenu } from 'contain/librarymenu';
import MenuButton from 'components/atoms/buttons/MenuButton';

function LibraryMenuList({ useId, navId }: LibraryMenuTypes) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (useId) dispatch(MyLibraryRequest({ progress: navId }));
    return () => {
      dispatch(MyLibraryInit());
    };
  }, [useId, navId]);

  const navMoveClick = (curId: number) => {
    if (LibraryMenu[0].id === curId) {
      dispatch(navLike());
    } else if (LibraryMenu[1].id === curId) {
      dispatch(navRead());
    } else {
      dispatch(navDone());
    }
  };

  return (
    <MyLibraryMenuContainer>
      {LibraryMenu.map((item) => (
        <MenuButton
          className="roundborder"
          key={item.id}
          src={item.image}
          imgSize={18}
          content={item.desc}
          handleClick={() => navMoveClick(item.id)}
          isBtnClick={navId === item.id}
          bgColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
          fontColor={theme.color.COLOR_WHITE}
          fontSize={1.4}
          fontWeight={300}
          height={20}
        />
      ))}
    </MyLibraryMenuContainer>
  );
}

export default LibraryMenuList;

const MyLibraryMenuContainer = styled.div`
  display: flex;
  gap: 5px;
  button {
    height: 40px;
  }
`;
