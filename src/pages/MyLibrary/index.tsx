import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navInit } from 'redux/reducers/Func';
import Container from 'components/Container';
import MyLibraryNav from './components/MyLibraryNav';
import MyLibraryTitle from './components/MyLibraryTitle';

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(navInit());
    };
  }, []);

  return (
    <Container>
      <MyLibraryTitle />
      <MyLibraryNav />
    </Container>
  );
}

export default Index;
