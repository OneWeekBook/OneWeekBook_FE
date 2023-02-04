import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import Container from 'components/Container';

const BookInfo = lazy(
  () => import(/* webpackChunkName: "BookInfo" */ './components/BookInfo'),
);

const ReviewInfo = lazy(
  () => import(/* webpackChunkName: "ReviewInfo" */ './components/ReviewInfo'),
);

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ReviewRequest({
        isbn: Number(location.pathname.split('/')[2]),
        start: 0,
        sortby: `${location.search.split('=')[1]}`,
      }),
    );
    return () => {
      dispatch(ReviewInit());
    };
  }, []);

  return (
    <Container>
      <BookInfo />
      <ReviewInfo />
    </Container>
  );
}

export default Index;
