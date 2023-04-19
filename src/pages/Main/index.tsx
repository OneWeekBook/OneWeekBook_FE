import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';
import { NewReviewTypes } from 'types/main';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { NewReviewInit, NewReviewsRequest } from 'redux/reducers/NewReview';
import Container from 'common/Container';
import Banner from 'components/modules/banner/Banner';
import BestBookCard from 'components/modules/cards/BestBookCard';
import MainLabel from 'components/modules/labels/MainLabel';
import Pagination from 'components/modules/pagination/Pagination';
import NewReivewCard from 'components/modules/cards/NewReivewCard';

function Index() {
  const dispatch = useDispatch();
  const [bestIdx, setBestIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const reviews = useSelector(
    (state: AppStateType) => state.review.reviews,
    shallowEqual,
  );

  const newReviews = useSelector(
    (state: AppStateType) => state.newReview.newReviews,
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
      <BookListContainer>
        <MainLabel
          title="Best Books"
          subTitle="사람들의 관심을 한몸에 받는 책"
          fontSize={3.4}
        />
        <BestBooksGrid idx={bestIdx}>
          {reviews.slice(0, 12).map((item: ReviewItemType, idx: number) => (
            <BestBookCard
              key={item.id}
              idx={idx + 1}
              {...item}
              count={item.countReviews}
            />
          ))}
        </BestBooksGrid>
        <Pagination totalPage={2} idx={bestIdx} setIdx={setBestIdx} />
      </BookListContainer>
      <BookListContainer>
        <MainLabel
          title="Books Review"
          subTitle="따끈따끈한 새 리뷰"
          fontSize={3.4}
        />
        <NewReviewGrid idx={reviewIdx}>
          {newReviews.map((item: NewReviewTypes) => (
            <NewReivewCard key={item.id} {...item} />
          ))}
        </NewReviewGrid>
        <Pagination
          totalPage={Math.floor(newReviews.length / 4)}
          idx={reviewIdx}
          setIdx={setReviewIdx}
        />
      </BookListContainer>
    </Container>
  );
}

export default Index;

const BookListContainer = styled.div`
  margin: 50px auto 0px;
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
  margin-bottom: 50px;
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

const NewReviewGrid = styled.div<{ idx: number }>`
  transform: translateX(${({ idx }) => 0 - idx * 1010}px);
  transition-duration: 0.5s;
  width: 100%;
  min-height: 150px;
  margin-bottom: 50px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  gap: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 710}px);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 360}px);
  }
`;
