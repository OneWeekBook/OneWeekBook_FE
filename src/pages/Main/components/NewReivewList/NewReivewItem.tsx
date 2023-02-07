import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getImgErr } from 'lib/ImageError';
import { NewReviewTypes } from 'types/main';

function NewReivewListItem({
  img,
  title,
  author,
  publisher,
  review,
  rating,
  isbn,
  user,
}: React.PropsWithChildren<NewReviewTypes>) {
  return (
    <ItemWrapper>
      <Link to={`/review/${isbn}?sort=new`}>
        <BookImage>
          <img src={img} alt="book" onError={getImgErr} />
        </BookImage>
        <InfoWrapper>
          <Reviewer>
            {user.nick.length > 5
              ? `${user.nick.substring(0, 5)}...`
              : user.nick}{' '}
            님의 리뷰
          </Reviewer>
          <CountInfoWrapper>
            {[1, 2, 3, 4, 5].map((el) => (
              <img
                key={el}
                src={`${process.env.PUBLIC_URL}/assets/func/${
                  el < rating ? 'star-full' : 'star-empty'
                }.png`}
                alt="recommend"
                width={24}
                height={24}
              />
            ))}
          </CountInfoWrapper>
          <Review>{review}</Review>
        </InfoWrapper>
      </Link>
    </ItemWrapper>
  );
}

export default NewReivewListItem;

const ItemWrapper = styled.div`
  width: 495px;
  background-color: #faf39e;
  box-sizing: border-box;
  padding: 15px;
  a {
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: black;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 345px;
    padding: 10px;
    a {
      gap: 10px;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
  }
`;

const BookImage = styled.div`
  flex-shrink: 0;
  width: 180px;
  height: 270px;
  background-color: #fff;
  padding: 20px 15px;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 120px;
    height: 180px;
    padding: 15px 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 130px;
    height: 195px;
  }
`;

const InfoWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 310px;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 15px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    height: 210px;
    padding: 15px 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const Reviewer = styled.p`
  font-size: 18px;
  margin: 0 auto;
  font-weight: 700;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 14px;
  }
`;

const Review = styled.p`
  font-size: 16px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 14px;
    -webkit-line-clamp: 6;
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 10px auto 15px;
`;
