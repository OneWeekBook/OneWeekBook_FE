import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { HeaderType } from 'types/common';
import { AppStateType } from 'redux/reducers';
import { authInit } from 'redux/reducers/authUserReducer';
import useRouter from 'hooks/useRouter';
import { removeAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import { showToast } from 'common/Toast';
import { PATH_URL } from 'constants/path';
import HeaderMenu from 'components/modules/commons/HeaderMenu';
import HeaderCategory from 'components/modules/commons/HeaderCategory';
import Container from './Container';

function Header({ handleToggle }: HeaderType) {
  const { routeTo } = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );

  const handleAuthPathCheck = () => {
    const link = [PATH_URL.LIBRARY, PATH_URL.USER];
    return link.includes(window.location.pathname);
  };

  const handleSignOut = () => {
    removeAccessTokenFromSessionStorage();
    dispatch(authInit());
    if (handleAuthPathCheck()) routeTo(PATH_URL.MAIN, true);
    showToast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <HeaderMenu
        handleToggle={handleToggle}
        handleSignOut={handleSignOut}
        isAuth={isAuth}
      />
      <HeaderCategory />
    </Container>
  );
}

export default Header;
