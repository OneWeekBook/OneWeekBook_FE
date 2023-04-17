import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { NewReviewInit, NewReviewsRequest } from 'redux/reducers/NewReview';
import Container from 'common/Container';
import Banner from 'components/modules/banner/Banner';
import BestList from './components/BestList';
import NewReviewList from './components/NewReivewList';

function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'totalReviews' }));
    dispatch(NewReviewsRequest());
    return () => {
      dispatch(ReviewInit());
      dispatch(NewReviewInit());
    };
  }, []);

  return (
    <Container>
      <Banner />
      <BestList />
      <NewReviewList />
    </Container>
  );
}

export default Index;
