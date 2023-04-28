import { useDispatch } from 'react-redux';
import { HeaderType } from 'types/common';
import { AuthInit } from 'redux/reducers/AuthUser';
import { showToast } from 'common/Toast';
import HeaderMenu from 'components/modules/commons/HeaderMenu';
import HeaderCategory from 'components/modules/commons/HeaderCategory';
import Container from './Container';

function Header({ handleToggle }: HeaderType) {
  const dispatch = useDispatch();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    showToast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <HeaderMenu handleToggle={handleToggle} handleSignout={logoutClick} />
      <HeaderCategory />
    </Container>
  );
}

export default Header;
