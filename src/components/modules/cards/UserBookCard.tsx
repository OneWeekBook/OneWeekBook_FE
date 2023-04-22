import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { userBooksTypes } from 'types/main';
import StarIcon from 'components/atoms/icons/StarIcon';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import ReviewText from 'components/atoms/texts/ReviewText';

function UserBookCard({
  img,
  title,
  review,
  rating,
  isbn,
}: React.PropsWithChildren<userBooksTypes>) {
  return (
    <UserBookCardContainer
      to={review ? `/review/${isbn}?sort=recommend` : '/myPage'}
    >
      <UserBookImage>
        <DefaultImage
          className="bookimage"
          imageSrc={img}
          imageAlt="book img"
          pc={[120, 180]}
        />
      </UserBookImage>
      <UserBookInfo>
        <DefaultText
          className="booktitle"
          content={title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
          fontSize={1.8}
        />
        <StarIcons>
          {[0, 1, 2, 3, 4].map((el) => (
            <StarIcon key={el} score={el < rating ? 1 : 0} imageSize={20} />
          ))}
        </StarIcons>
        <ReviewText
          className="bookreview"
          content={
            review && review.replaceAll('<b>', '').replaceAll('</b>', '')
          }
        />
      </UserBookInfo>
    </UserBookCardContainer>
  );
}

export default UserBookCard;

const UserBookCardContainer = styled(Link)`
  cursor: pointer;
  position: relative;
  border: 3px solid ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 5px;
  display: flex;
`;

const UserBookImage = styled.div`
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  padding: 15px;
  width: 120px;
  height: 180px;
  flex-shrink: 0;
`;

const UserBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  .booktitle {
    height: 48px;
    line-height: 21px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookreview {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StarIcons = styled.div`
  display: flex;
  gap: 5px;
  margin: 5px 0px 15px;
`;
