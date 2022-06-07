import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navInit } from 'redux/reducers/Func';
import Container from 'components/Container';
import MyLibraryNav from './components/MyLibraryNav';
import MyLibraryTitle from './components/MyLibraryTitle';

function Index() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.authUser);

  useEffect(() => {
    return () => {
      dispatch(navInit());
    };
  }, []);

  return (
    <Container>
      <MyLibraryTitle nick={user.nick} />
      <MyLibraryNav />
    </Container>
  );
}

export default Index;
