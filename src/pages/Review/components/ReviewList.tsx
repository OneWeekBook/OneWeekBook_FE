import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { ReviewItemType } from 'types/review';
import PagenationForm from 'components/Form/PagenationForm';
import ReviewItem from './ReviewItem';

function ReviewList() {
  const dispatch = useDispatch();
  const [curIdx, setCurIdx] = useState<number>(1);
  const { reviews, reivewsTotal } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'new' }));
    return () => {
      dispatch(ReviewInit());
    };
  }, []);

  useEffect(() => {
    dispatch(ReviewsRequest({ start: (curIdx - 1) * 12, sortby: 'new' }));
  }, [curIdx]);

  return (
    <Wrapper>
      {Array.isArray(reviews) && !!reviews && (
        <>
          <ReviewTitle>전체 리뷰 ({reivewsTotal}건)</ReviewTitle>
          <ReviewListWrapper>
            {reviews.map((item: ReviewItemType) => {
              return (
                <ReviewItem key={item.id} {...item} count={item.countReviews} />
              );
            })}
          </ReviewListWrapper>
          <PagenationForm
            total={reivewsTotal}
            display={12}
            curIdx={curIdx}
            setCurIdx={setCurIdx}
          />
        </>
      )}
    </Wrapper>
  );
}

export default ReviewList;

const Wrapper = styled.div`
  margin: 30px auto 50px;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 85%;
  }
`;

const ReviewTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ReviewListWrapper = styled.div`
  display: grid;
  margin-top: 30px;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  min-height: 600px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) =>
      device.mobile.maxWidth - 1}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
