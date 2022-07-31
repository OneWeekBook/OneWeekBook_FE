import { lazy } from 'react';
import Container from 'components/Container';

const ReviewList = lazy(
  () => import(/* webpackChunkName: "ReviewList" */ './components/ReviewList'),
);

function Index() {
  return (
    <Container>
      <ReviewList />
    </Container>
  );
}

export default Index;
