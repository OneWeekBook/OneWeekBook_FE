import { PropsWithChildren, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getImgErr } from 'lib/ImageError';
import { ReviewDetailTypes } from 'types/review';
import { ReviewUserCardType } from 'types/module';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DataText from 'components/atoms/texts/DataText';
import theme from 'styles/theme';
import MultiText from 'components/atoms/texts/MultiText';
import DefaultText from 'components/atoms/texts/DefaultText';

function ReviewUserCard({
  nick,
  oneLikeCount,
  rating,
  review,
  reviewCreationTime,
  zeroLikeCount,
  handleClick,
}: PropsWithChildren<ReviewDetailTypes & ReviewUserCardType>) {
  const [isRecommend, setIsRecommend] = useState(false);

  useEffect(() => {
    if (rating > 2) setIsRecommend(true);
  }, [rating]);

  return (
    <ReviewItemWrapper onClick={handleClick}>
      <UserReviewInfo>
        <FavoriteImage>
          <DefaultImage
            imageSrc={`${process.env.PUBLIC_URL}/${
              isRecommend ? 'assets/like/good.svg' : 'assets/like/bad.svg'
            }`}
            imageAlt="icon"
            pc={[75, 75]}
            onError={getImgErr}
          />
          <DataText
            data={rating}
            fontColor={[theme.color.COLOR_CORAL, theme.color.COLOR_CORAL]}
            fontSize={2}
          />
        </FavoriteImage>
        <ReivewInfoWrapper>
          <DefaultText
            content={`${nick} 님의 리뷰`}
            fontSize={1.8}
            fontWeight={700}
          />
          <DataText
            before="작성일 : "
            data={reviewCreationTime}
            fontSize={1.6}
            fontWeight={700}
          />
          <DefaultText
            className="review"
            content={review}
            fontSize={1.6}
            fontWeight={300}
          />
        </ReivewInfoWrapper>
      </UserReviewInfo>
      <RecommendWrapper>
        <MultiText
          className="reviewrole"
          imageSrc={`${process.env.PUBLIC_URL}/assets/like/interest.png`}
          imageAlt="interest"
          imageSize={25}
          fontColor={theme.color.COLOR_WHITE}
          fontWeight={300}
          content={`${zeroLikeCount} 유용해요`}
        />
        <MultiText
          className="reviewrole"
          imageSrc={`${process.env.PUBLIC_URL}/assets/like/fun.png`}
          imageAlt="interest"
          imageSize={25}
          fontColor={theme.color.COLOR_WHITE}
          fontWeight={300}
          content={`${oneLikeCount} 재미있어요`}
        />
      </RecommendWrapper>
    </ReviewItemWrapper>
  );
}

export default ReviewUserCard;

const ReviewItemWrapper = styled.div`
  height: 250px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.color.COLOR_CORAL};
  cursor: pointer;
`;

const UserReviewInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FavoriteImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: -60px;
  width: 75px;
  height: 100%;
  p {
    margin-top: -20px;
  }
`;

const ReivewInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px 20px 20px 10px;
  .review {
    height: 100px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RecommendWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0px 20px;
  .reviewrole {
    max-width: 190px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  }
`;
