import { useDispatch } from 'react-redux';
import { AuthInit } from 'redux/reducers/AuthUser';
import { Toast } from 'lib/Toast';
import HeaderTopMenu from 'components/modules/commons/HeaderTopMenu';
import HeaderMainCategory from 'components/modules/commons/HeaderMainCategory';
import Container from './Container';

type PropsType = {
  handleToggle: () => void;
};

function Header({ handleToggle }: PropsType) {
  const dispatch = useDispatch();

  const logoutClick = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(AuthInit());
    Toast('info', '로그아웃 되었습니다.');
  };

  return (
    <Container as="header">
      <HeaderTopMenu handleToggle={handleToggle} handleSignout={logoutClick} />
      <HeaderMainCategory />
    </Container>
  );
}

export default Header;
