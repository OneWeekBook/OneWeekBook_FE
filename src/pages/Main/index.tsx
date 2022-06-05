import React, { useEffect } from 'react';
import Container from 'components/Container';
import { useDispatch } from 'react-redux';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { NewReviewInit, NewReviewsRequest } from 'redux/reducers/NewReview';
import { toast } from 'react-toastify';
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

  const notify = () => toast.success('Wow so easy!');

  return (
    <Container>
      <Slider />
      <BestList />
      <NewReviewList />
      <button type="button" onClick={notify}>
        버튼
      </button>
    </Container>
  );
}

export default Index;
