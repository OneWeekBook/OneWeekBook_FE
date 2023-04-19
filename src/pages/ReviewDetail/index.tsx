import Container from 'common/Container';
import styled from 'styled-components';
import { shallowEqual, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import ReviewInfo from './components/ReviewInfo';
import BookBannerInfo from './components/_items/BookBannerInfo';

function Index() {
  const { bookData } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  return (
    <>
      <BookBanner style={{ backgroundImage: `url(${bookData.img})` }}>
        <BannerBlind>
          <Container>
            {bookData.title && <BookBannerInfo {...bookData} />}
          </Container>
        </BannerBlind>
      </BookBanner>
      <Container>
        <ReviewInfo />
      </Container>
    </>
  );
}

export default Index;

const BookBanner = styled.div`
  background-size: cover;
  margin: 20px auto 50px;
  width: 100%;
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;

const BannerBlind = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;
