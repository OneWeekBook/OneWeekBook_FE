import React from 'react';
import Container from 'components/Container';
import Slider from './components/Slider';
import BestList from './components/BestList';
import NewReviewList from './components/NewReivewList';

function Index() {
  return (
    <Container>
      <Slider />
      <BestList />
      <NewReviewList />
    </Container>
  );
}

export default Index;
