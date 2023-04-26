import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NewReviewResponseTypes } from 'types/response';
import { getImgErr } from 'utils/ImageError';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import ReviewText from 'components/atoms/texts/ReviewText';
import StarIcon from 'components/atoms/icons/StarIcon';

function NewReivewCard({
  img,
  review,
  rating,
  isbn,
  user,
}: React.PropsWithChildren<NewReviewResponseTypes>) {
  return (
    <CardContainer to={`/review/${isbn}?sort=new`}>
      <ImageContainer>
        <DefaultImage
          imageSrc={img}
          imageAlt="book"
          className="bookimage"
          pc={[180, 270]}
          tablet={[120, 180]}
          mobile={[130, 195]}
          onError={getImgErr}
        />
      </ImageContainer>
      <ReviewInfo>
        <DefaultText
          content={`${
            user.nick.length > 5 ? `${user.nick.substring(0, 5)}...` : user.nick
          }
          님의 리뷰`}
          fontSize={1.8}
          align="center"
          reactive
        />
        <CountInfoWrapper>
          {[0, 1, 2, 3, 4].map((el) => (
            <StarIcon key={el} score={el < rating ? 1 : 0} imageSize={20} />
          ))}
        </CountInfoWrapper>
        <ReviewText className="review" content={review} />
      </ReviewInfo>
    </CardContainer>
  );
}

export default NewReivewCard;

const CardContainer = styled(Link)`
  width: 495px;
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.COLOR_ANTIQUE_WHITE};
  box-sizing: border-box;
  padding: 15px;
  color: ${({ theme }) => theme.color.COLOR_BLACK};
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 345px;
    padding: 10px;
    gap: 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 270px;
  background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  padding: 20px 15px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 120px;
    height: 180px;
    padding: 15px 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 130px;
    height: 195px;
    margin: 0 auto;
  }
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  box-sizing: border-box;
  width: 100%;
  height: 310px;
  padding: 20px 15px;
  .review {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    height: 210px;
    padding: 15px 10px;
    .review {
      -webkit-line-clamp: 5;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 10px auto 15px;
`;
