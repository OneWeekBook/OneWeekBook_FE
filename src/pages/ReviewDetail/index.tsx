import React from 'react';
import Container from 'components/Container';
import BookInfo from './components/BookInfo';
import ReviewInfo from './components/ReviewInfo';

function Index() {
  return (
    <Container>
      <BookInfo />
      <ReviewInfo />
    </Container>
  );
}

export default Index;
