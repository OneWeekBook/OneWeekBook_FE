import { useDispatch } from 'react-redux';
import { AuthInit } from 'redux/reducers/AuthUser';
import { Toast } from 'lib/Toast';
import HeaderTopMenu from 'components/modules/common/HeaderTopMenu';
import HeaderMainCategory from 'components/modules/common/HeaderMainCategory';
import Container from './Container';

type PropsType = {
  toggleIsOn: () => void;
};

function Header({ toggleIsOn }: PropsType) {
  const dispatch = useDispatch();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    Toast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <HeaderTopMenu handleToggle={toggleIsOn} handleSignout={logoutClick} />
      <HeaderMainCategory />
    </Container>
  );
}

export default Header;
