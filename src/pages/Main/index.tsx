import React, { useEffect } from 'react';
import Container from 'components/Container';
import { useDispatch } from 'react-redux';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import Slider from './components/Slider';
import BestList from './components/BestList';
import NewReviewList from './components/NewReivewList';

function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'new' }));
    return () => {
      dispatch(ReviewInit());
    };
  }, []);

  return (
    <Container>
      <Slider />
      <BestList />
      <NewReviewList />
    </Container>
  );
}

export default Index;
