import React, { useEffect } from 'react';
import Container from 'components/Container';
import { useDispatch } from 'react-redux';
import { ReviewRequest } from 'redux/reducers/Review';
import { useLocation } from 'react-router-dom';
import BookInfo from './components/BookInfo';
import ReviewInfo from './components/ReviewInfo';

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ReviewRequest({
        isbn: Number(location.pathname.split('/')[2]),
        sortby: `${location.search.split('=')[1]}`,
      }),
    );
  }, []);

  return (
    <Container>
      <BookInfo />
      <ReviewInfo />
    </Container>
  );
}

export default Index;
