import { useDispatch } from 'react-redux';
import { HeaderType } from 'types/common';
import { authInit } from 'redux/reducers/authUserReducer';
import { removeAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import { showToast } from 'common/Toast';
import HeaderMenu from 'components/modules/commons/HeaderMenu';
import HeaderCategory from 'components/modules/commons/HeaderCategory';
import Container from './Container';

function Header({ handleToggle }: HeaderType) {
  const dispatch = useDispatch();

  const signOutClick = () => {
    removeAccessTokenFromSessionStorage();
    dispatch(authInit());
    showToast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <HeaderMenu handleToggle={handleToggle} handleSignOut={signOutClick} />
      <HeaderCategory />
    </Container>
  );
}

export default Header;
