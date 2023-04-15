import Container from 'common/Container';
import BookInfo from './components/BookInfo';
import ReviewInfo from './components/ReviewInfo';

function Index() {
  return (
    <>
      <BookInfo />
      <Container>
        <ReviewInfo />
      </Container>
    </>
  );
}

export default Index;
