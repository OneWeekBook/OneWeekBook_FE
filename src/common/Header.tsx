import { useDispatch } from 'react-redux';
import { HeaderType } from 'types/common';
import { AuthInit } from 'redux/reducers/AuthUser';
import { showToast } from 'common/Toast';
import HeaderTopMenu from 'components/modules/commons/HeaderTopMenu';
import HeaderMainCategory from 'components/modules/commons/HeaderMainCategory';
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
      <HeaderTopMenu handleToggle={handleToggle} handleSignout={logoutClick} />
      <HeaderMainCategory />
    </Container>
  );
}

export default Header;
