import { PropsWithChildren, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getImgErr } from 'lib/ImageError';
import { ReviewDetailTypes } from 'types/review';

type PropsType = {
  onClick: () => void;
};

function ReviewItem({
  nick,
  oneLikeCount,
  rating,
  review,
  reviewCreationTime,
  zeroLikeCount,
  onClick,
}: PropsWithChildren<ReviewDetailTypes & PropsType>) {
  const [isRecommend, setIsRecommend] = useState(false);

  useEffect(() => {
    if (rating > 2) setIsRecommend(true);
  }, [rating]);

  return (
    <Wrapper onClick={onClick}>
      <ImgWrapper>
        <img
          src={`${process.env.PUBLIC_URL}/${
            isRecommend ? 'assets/like/good.svg' : 'assets/like/bad.svg'
          }`}
          alt="icon"
          width={75}
          onError={getImgErr}
        />
        <p>{rating}</p>
      </ImgWrapper>
      <ReivewInfoWrapper>
        <p className="overall">{review}</p>
        <p className="reviewInfo">
          {nick}&nbsp;&nbsp;<span>{reviewCreationTime}</span>
        </p>
        <div className="recommends">
          <p>
            <span>{zeroLikeCount}</span>명이 해당 리뷰가 유용하다고 생각해요
          </p>
          <p>
            <span>{oneLikeCount}</span>명이 해당 리뷰가 재미있다고 생각해요
          </p>
        </div>
      </ReivewInfoWrapper>
    </Wrapper>
  );
}

export default ReviewItem;

const Wrapper = styled.div`
  min-height: 100px;
  border-radius: 10px;
  background-color: #e6e6e6;
  cursor: pointer;
  display: flex;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  width: 75px;
  height: 100%;
  p {
    margin-top: -20px;
    font-size: 18px;
    font-weight: 600;
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
    font-weight: 500;
    span {
      font-weight: 600;
    }
  }
`;
