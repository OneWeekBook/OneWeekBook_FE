import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { NewReviewInit, NewReviewsRequest } from 'redux/reducers/NewReview';
import Container from 'common/Container';
import Banner from 'components/modules/banner/Banner';
import BestBookCard from 'components/modules/cards/BestBookCard';
import MainLabel from 'components/modules/labels/MainLabel';
import Pagination from 'components/modules/pagination/Pagination';
import NewReviewList from './components/NewReivewList';

function Index() {
  const dispatch = useDispatch();
  const [idx, setIdx] = useState(0);
  const reviews = useSelector(
    (state: AppStateType) => state.review.reviews,
    shallowEqual,
  );

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
      <BestBooks>
        <MainLabel
          title="Best Books"
          subTitle="사람들의 관심을 한몸에 받는 책"
          fontSize={3.6}
        />
        <BestBooksGrid idx={idx}>
          {reviews.slice(0, 12).map((item: ReviewItemType, idx: number) => (
            <BestBookCard
              key={item.id}
              idx={idx + 1}
              {...item}
              count={item.countReviews}
            />
          ))}
        </BestBooksGrid>
        <Pagination totalPage={2} idx={idx} setIdx={setIdx} />
      </BestBooks>
      <NewReviewList />
    </Container>
  );
}

export default Index;

const BestBooks = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  overflow: hidden;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 700px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 350px;
  }
`;

const BestBooksGrid = styled.div<{ idx: number }>`
  transform: translateX(${({ idx }) => 0 - idx * 1010}px);
  transition-duration: 0.5s;
  width: 100%;
  min-height: 150px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  gap: 15px 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 710}px);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 360}px);
  }
`;
