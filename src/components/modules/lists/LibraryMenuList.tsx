import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { LibraryMenuTypes } from 'types/module';
import { navDone, navLike, navRead } from 'redux/reducers/Func';
import { LibraryInit, LibraryRequest } from 'redux/reducers/Library';
import { libraryMenu } from 'constants/content';
import MenuButton from 'components/atoms/buttons/MenuButton';

function LibraryMenuList({ useId, navId }: LibraryMenuTypes) {
  const dispatch = useDispatch();

  const handleMenuClick = (curId: number) => {
    if (libraryMenu[0].id === curId) {
      dispatch(navLike());
    } else if (libraryMenu[1].id === curId) {
      dispatch(navRead());
    } else {
      dispatch(navDone());
    }
  };

  useEffect(() => {
    if (useId) dispatch(LibraryRequest({ progress: navId }));
    return () => {
      dispatch(LibraryInit());
    };
  }, [useId, navId]);

  return (
    <LibraryMenuListModule>
      {libraryMenu.map((item) => (
        <MenuButton
          className="roundborder"
          key={item.id}
          src={item.image}
          imageSize={18}
          content={item.desc}
          handleClick={() => handleMenuClick(item.id)}
          isBtnClick={navId === item.id}
          bgColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
          fontColor={theme.color.COLOR_WHITE}
          fontSize={1.4}
          fontWeight={300}
          height={20}
        />
      ))}
    </LibraryMenuListModule>
  );
}

export default LibraryMenuList;

const LibraryMenuListModule = styled.div`
  display: flex;
  gap: 5px;
  button {
    height: 40px;
  }
`;
