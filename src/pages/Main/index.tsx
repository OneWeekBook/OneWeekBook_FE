import React, { useEffect } from 'react';
import Container from 'components/Container';
import { useDispatch } from 'react-redux';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { NewReviewInit, NewReviewsRequest } from 'redux/reducers/NewReview';
import Slider from './components/Slider';
import BestList from './components/BestList';
import NewReviewList from './components/NewReivewList';

function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'new' }));
    dispatch(NewReviewsRequest());
    return () => {
      dispatch(ReviewInit());
      dispatch(NewReviewInit());
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
