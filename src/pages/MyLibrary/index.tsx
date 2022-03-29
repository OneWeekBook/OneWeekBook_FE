import Container from 'components/Container';
import React, { useState } from 'react';
import MyLibraryNav from './components/MyLibraryNav';
import MyLibraryTitle from './components/MyLibraryTitle';

function Index() {
  return (
    <Container>
      <MyLibraryTitle />
      <MyLibraryNav />
    </Container>
  );
}

export default Index;
