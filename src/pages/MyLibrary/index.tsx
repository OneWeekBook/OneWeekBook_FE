import React, { useEffect } from 'react';
import Container from 'components/Container';
import { useDispatch } from 'react-redux';
import { navInit } from 'redux/reducers/Func';
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
