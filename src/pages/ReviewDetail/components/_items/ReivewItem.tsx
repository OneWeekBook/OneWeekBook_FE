import React, { PropsWithChildren, useState, useEffect } from 'react';

import styled from 'styled-components';
import { ReviewDetailTypes } from 'types/review';

function ReviewItem({
  review,
  rating,
  nick,
}: PropsWithChildren<ReviewDetailTypes>) {
  const [isRecommend, setIsRecommend] = useState(false);

  useEffect(() => {
    if (rating > 2) setIsRecommend(true);
  }, []);

  return (
    <Wrapper>
      <ImgWrapper isRecommend={isRecommend}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
          alt="icon"
        />
      </ImgWrapper>
      <ReivewInfoWrapper>
        <p className="overall">{review}</p>
        <p className="reviewInfo">
          {nick}&nbsp;&nbsp;<span>2020.01.01</span>
        </p>
        <p className="recommends">
          <b>{0}</b>명이 해당 리뷰를 추천
        </p>
      </ReivewInfoWrapper>
    </Wrapper>
  );
}

export default ReviewItem;

const Wrapper = styled.div`
  min-height: 100px;
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
  margin: 20px 10px;
  width: 100%;
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
