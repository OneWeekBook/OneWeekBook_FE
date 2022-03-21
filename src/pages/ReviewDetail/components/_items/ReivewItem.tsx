import { ReviewDetailItemTypes } from 'db/reviewdetail';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

function ReviewItem({
  reviewer,
  isRecommend,
  reviewDate,
  summary,
  overall,
  recommends,
}: PropsWithChildren<ReviewDetailItemTypes>) {
  return (
    <Wrapper>
      <ImgWrapper isRecommend={isRecommend}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
          alt="icon"
        />
      </ImgWrapper>
      <ReivewInfoWrapper>
        <p className="summary">{summary}</p>
        <p className="overall">{overall}</p>
        <p className="reviewInfo">
          {reviewer}&nbsp;&nbsp;<span>{reviewDate}</span>
        </p>
        <p className="recommends">
          <b>{recommends}</b>명이 해당 리뷰를 추천
        </p>
      </ReivewInfoWrapper>
    </Wrapper>
  );
}

export default ReviewItem;

const Wrapper = styled.div`
  min-height: 150px;
  background-color: #e6e6e6;
  display: flex;
`;

const ImgWrapper = styled.div<{ isRecommend: boolean }>`
  flex-shrink: 0;
  margin-top: 10px;
  margin-left: 10px;
  width: 35px;
  height: 35px;
  img {
    transform: rotate(
      ${({ isRecommend }) => (isRecommend ? '0deg' : '180deg')}
    );
    width: 100%;
    height: 100%;
  }
`;

const ReivewInfoWrapper = styled.div`
  margin: 10px; 10px;
  .summary {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .overall {
    font-size: 16px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .reviewInfo {
    margin: 5px auto;
    text-align: right;
    font-size: 16px;
    span {
        font-size: 14px;
        font-weight: 600;
    }
  }
  .recommends {
      font-size: 14px;
      font-weight: 600;
  }
`;
