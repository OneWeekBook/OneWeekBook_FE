import React, { useEffect, useState } from 'react';
import PagenationForm from 'components/Form/PagenationForm';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReviewsRequest } from 'redux/reducers/Review';
import { ReviewItemType } from 'types/review';
import ReviewItem from './_item/ReviewItem';

type CountType = {
  isbn: string;
  count: number;
};

function ReviewList() {
  const dispatch = useDispatch();
  const [curIdx, setCurIdx] = useState<number>(1);
  const { reviews } = useSelector((state: any) => state.review);

  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'new' }));
  }, []);

  useEffect(() => {
    dispatch(ReviewsRequest({ start: (curIdx - 1) * 10, sortby: 'new' }));
  }, [curIdx]);

  return (
    <Wrapper>
      <ReviewTitle>
        전체 리뷰 ({reviews.count && reviews.count.length}건)
      </ReviewTitle>
      <ReviewListWrapper>
        {reviews.rows &&
          reviews.rows.map((item: ReviewItemType) => {
            const index = reviews.count.findIndex(
              (i: CountType) => i.isbn === item.isbn,
            );
            return (
              <ReviewItem
                key={item.id}
                {...item}
                count={reviews.count[index].count}
              />
            );
          })}
      </ReviewListWrapper>
      <PagenationForm
        total={reviews.count && reviews.count.length}
        curIdx={curIdx}
        setCurIdx={setCurIdx}
      />
    </Wrapper>
  );
}

export default ReviewList;

const Wrapper = styled.div`
  margin: 30px auto 50px;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const ReviewTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ReviewListWrapper = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  min-height: 600px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) =>
      device.mobile.maxWidth - 1}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
