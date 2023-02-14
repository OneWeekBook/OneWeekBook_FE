import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { userBooksType } from '../UserBookInfo';

function UserBookItem({
  img,
  title,
  review,
  rating,
  isbn,
}: React.PropsWithChildren<userBooksType>) {
  return (
    <ItemWrapper>
      <Link to={review ? `/review/${isbn}?sort=recommend` : '/myPage'}>
        <ImageWrapper>
          <img src={img} alt="book img" />
        </ImageWrapper>
        <InfoWrapper>
          <ItemTitle>
            {title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </ItemTitle>
          <CountInfoWrapper>
            {[0, 1, 2, 3, 4].map((el) => (
              <img
                key={el}
                src={`${process.env.PUBLIC_URL}/assets/func/${
                  el < rating ? 'star-full' : 'star-empty'
                }.png`}
                alt="recommend"
                width={20}
                height={20}
              />
            ))}
          </CountInfoWrapper>
          <ItemAuthor>
            {review && review.replaceAll('<b>', '').replaceAll('</b>', '')}
          </ItemAuthor>
        </InfoWrapper>
      </Link>
    </ItemWrapper>
  );
}

export default UserBookItem;

const ItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  border: 3px solid #f07055;
  border-radius: 5px;
  display: flex;
  a {
    display: flex;
  }
`;

const ImageWrapper = styled.div`
  background-color: #f07055;
  padding: 15px;
  width: 120px;
  height: 180px;
  flex-shrink: 0;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
`;

const ItemTitle = styled.p`
  height: 48px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemAuthor = styled.p`
  font-size: 16px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CountInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;
