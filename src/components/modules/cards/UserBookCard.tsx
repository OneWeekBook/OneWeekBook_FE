import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserBookResponseTypes } from 'types/response';
import { PATH_URL } from 'constants/path';
import StarImage from 'components/atoms/images/StarImage';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';

function UserBookCard({
  img,
  title,
  review,
  rating,
  isbn,
}: React.PropsWithChildren<UserBookResponseTypes>) {
  return (
    <UserBookCardModule
      to={review ? `${PATH_URL.REVIEW}/${isbn}?sort=recommend` : PATH_URL.USER}
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
            <StarImage key={el} score={el < rating ? 1 : 0} pc={[20, 20]} />
          ))}
        </StarIcons>
        <DefaultText
          className="review"
          content={
            review && review.replaceAll('<b>', '').replaceAll('</b>', '')
          }
        />
      </UserBookInfo>
    </UserBookCardModule>
  );
}

export default UserBookCard;

const UserBookCardModule = styled(Link)`
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
    height: 44px;
    line-height: 21px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .review {
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
