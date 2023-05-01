import { PropsWithChildren, useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { ReviewUserCardType } from 'types/module';
import { UserReviewResponseTypes } from 'types/response';
import { FAVORITE_IMAGE } from 'constants/image';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DataText from 'components/atoms/texts/DataText';
import MultiText from 'components/atoms/texts/MultiText';
import DefaultText from 'components/atoms/texts/DefaultText';
import ReviewText from 'components/atoms/texts/ReviewText';

function ReviewUserCard({
  nick,
  oneLikeCount,
  rating,
  review,
  reviewCreationTime,
  zeroLikeCount,
  handleClick,
}: PropsWithChildren<UserReviewResponseTypes & ReviewUserCardType>) {
  const [isRecommend, setIsRecommend] = useState(false);

  useEffect(() => {
    if (rating > 2) setIsRecommend(true);
  }, [rating]);

  return (
    <ReviewUserCardModule onClick={handleClick}>
      <UserReviewInfo>
        <FavoriteImage>
          <DefaultImage
            imageSrc={
              isRecommend
                ? FAVORITE_IMAGE.ACCESS_GOOD
                : FAVORITE_IMAGE.ACCESS_BAD
            }
            imageAlt="icon"
            pc={[75, 75]}
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
          <ReviewText className="review" content={review} />
        </ReivewInfoWrapper>
      </UserReviewInfo>
      <Recommends>
        <MultiText
          className="reviewrole"
          imageSrc={FAVORITE_IMAGE.USEFUL}
          imageAlt="interest"
          imageSize={25}
          fontColor={theme.color.COLOR_WHITE}
          fontWeight={300}
          content={`${zeroLikeCount} 도움이되요`}
        />
        <MultiText
          className="reviewrole"
          imageSrc={FAVORITE_IMAGE.INTEREST}
          imageAlt="interest"
          imageSize={25}
          fontColor={theme.color.COLOR_WHITE}
          fontWeight={300}
          content={`${oneLikeCount} 흥미로워요`}
        />
      </Recommends>
    </ReviewUserCardModule>
  );
}

export default ReviewUserCard;

const ReviewUserCardModule = styled.div`
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

const Recommends = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0px 20px;
`;
