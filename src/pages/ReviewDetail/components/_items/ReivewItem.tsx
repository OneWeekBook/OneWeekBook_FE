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
          height={75}
          onError={getImgErr}
        />
        <p>{rating}</p>
      </ImgWrapper>
      <ReivewInfoWrapper>
        <p className="reviewInfo">{nick}님의 리뷰</p>
        <p className="createDate">작성일 : {reviewCreationTime}</p>
        <p className="overall">{review}</p>
        <RecommendWrapper>
          <RecommendItem>
            <img
              src={`${process.env.PUBLIC_URL}/assets/like/fun.png`}
              alt="interest"
              width={25}
            />
            <p>
              <span>{zeroLikeCount}</span>유용해요
            </p>
          </RecommendItem>
          <RecommendItem>
            <img
              src={`${process.env.PUBLIC_URL}/assets/like/interest.png`}
              alt="funny"
              width={25}
            />
            <p>
              <span>{oneLikeCount}</span>재미있어요
            </p>
          </RecommendItem>
        </RecommendWrapper>
      </ReivewInfoWrapper>
    </Wrapper>
  );
}

export default ReviewItem;

const Wrapper = styled.div`
  min-height: 100px;
  border-radius: 5px;
  border: 3px solid #f07055;
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
    color: #f07055;
    margin-top: -20px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const ReivewInfoWrapper = styled.div`
  margin: 20px 10px;
  width: 100%;
  .overall {
    margin-bottom: 20px;
    font-size: 16px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .reviewInfo {
    font-size: 18px;
    font-weight: 700;
  }
  .createDate {
    margin: 5px auto 10px;
    font-size: 14px;
    font-weight: 700;
  }
`;

const RecommendWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    flex-direction: column;
  }
`;

const RecommendItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 3px solid #f07055;
  border-radius: 5px;
  background-color: #f07055;
  padding: 5px;
  width: 140px;
  p {
    color: #fff;
    font-size: 16px;
    span {
      font-weight: 700;
      margin-right: 5px;
    }
  }
`;
