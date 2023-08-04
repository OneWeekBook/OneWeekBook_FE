import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { LibraryMenuTypes } from 'types/module';
import { libraryInit, libraryRequest } from 'redux/reducers/libraryReducer';
import { PATH_URL } from 'constants/path';
import { libraryMenu } from 'constants/content';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import useRouter from 'hooks/useRouter';

function LibraryMenuList({ useId, navId }: LibraryMenuTypes) {
  const dispatch = useDispatch();
  const { routeTo } = useRouter();

  const handleMenuClick = (curId: number) => {
    if (libraryMenu[0].id === curId) {
      routeTo(`${PATH_URL.LIBRARY}?id=0`, true);
    } else if (libraryMenu[1].id === curId) {
      routeTo(`${PATH_URL.LIBRARY}?id=1`, true);
    } else if (libraryMenu[2].id === curId) {
      routeTo(`${PATH_URL.LIBRARY}?id=2`, true);
    }
  };

  useEffect(() => {
    if (useId) dispatch(libraryRequest({ progress: navId }));
    return () => {
      dispatch(libraryInit());
    };
  }, [useId, navId]);

  return (
    <LibraryMenuListModule>
      {libraryMenu.map((item) => (
        <DefaultButton
          key={item.id}
          imageSrc={item.image}
          imageSize={18}
          content={item.desc}
          handleClick={() => handleMenuClick(item.id)}
          isBtnClick={navId === item.id}
          backgroundColor={[
            theme.color.COLOR_CORAL,
            theme.color.COLOR_ORANGE_RED,
          ]}
          fontColor={[theme.color.COLOR_WHITE, theme.color.COLOR_WHITE]}
          fontSize={1.4}
          fontWeight={300}
          width={80}
          height={40}
        />
      ))}
    </LibraryMenuListModule>
  );
}

export default LibraryMenuList;

const LibraryMenuListModule = styled.div`
  display: flex;
  gap: 5px;
`;
