import { ReviewDetailItem, ReviewDetailItemTypes } from 'db/reviewdetail';
import React from 'react';
import styled from 'styled-components';
import ReviewItem from './_items/ReivewItem';

function ReviewInfo() {
  return (
    <Wrapper>
      <p className="title">{ReviewDetailItem.title} 평가</p>
      <button className="recommendBtn" type="button">
        추천 순
      </button>
      <button className="newBtn" type="button">
        최신 순
      </button>
      <ReviewListWrapper>
        {ReviewDetailItem.recommendReviews.map(
          (item: ReviewDetailItemTypes) => (
            <ReviewItem key={item.id} {...item} />
          ),
        )}
      </ReviewListWrapper>
    </Wrapper>
  );
}

export default ReviewInfo;

const Wrapper = styled.div`
  margin: 10px auto 50px;
  width: 100%;
  height: auto;
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .recommendBtn {
    box-sizing: border-box;
    border: none;
    border-right: 1px solid black;
    background-color: white;
    height: 20px;
    padding-right: 10px;
    font-size: 16px;
  }
  .newBtn {
    box-sizing: border-box;
    border: none;
    background-color: white;
    height: 20px;
    padding: 0 10px;
    font-size: 16px;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const ReviewListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
`;
