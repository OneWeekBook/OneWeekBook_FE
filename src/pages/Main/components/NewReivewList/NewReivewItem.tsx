import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NewReviewTypes } from 'types/main';

type PropsType = {
  idx: number;
};

function NewReivewListItem({
  img,
  title,
  author,
  publisher,
  review,
  rating,
  isbn,
  createdAt,
  user,
  idx,
}: React.PropsWithChildren<NewReviewTypes & PropsType>) {
  return (
    <ItemWrapper>
      <Link to={`/review/${isbn}?sort=new`}>
        <Index>{idx + 1}</Index>
        <BookImage src={img} alt="book" />
        <InfoWrapper>
          <BookTitleWrapper>
            {title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </BookTitleWrapper>
          <p className="infomation">
            <span>
              {author && author.replaceAll('<b>', '').replaceAll('</b>', '')}
            </span>
            &nbsp;&nbsp;
            {publisher &&
              publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
          </p>
          <p className="reviewer">
            <span>{user.nick}</span> {createdAt}
          </p>
          <p className="review">{review}</p>
        </InfoWrapper>
        <CountInfoWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/assets/func/star.svg`}
            alt="recommend"
            width={50}
            height={50}
          />
          <p>{rating}</p>
        </CountInfoWrapper>
      </Link>
    </ItemWrapper>
  );
}

export default NewReivewListItem;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
    text-decoration: none;
    color: black;
  }
  border-bottom: 1px solid gray;
`;

const Index = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: gray;
  margin: auto 20px;
`;

const BookImage = styled.img`
  width: 90px;
  height: 120px;
  flex-shrink: 0;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 90px;
  }
`;

const BookTitleWrapper = styled.p`
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 16px;
  }
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 5px;
  padding-left: 10px;
  .infomation {
    font-size: 15px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      font-weight: 700;
    }
  }
  .reviewer {
    font-size: 15px;
    margin-bottom: 5px;
    span {
      font-weight: 700;
    }
  }
  .review {
    font-size: 15px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .infomation {
      font-size: 14px;
    }
    .reviewer {
      font-size: 14px;
    }
    .review {
      font-size: 14px;
    }
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0 10px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 12px;
    display: block;
    margin: 0 5px;
  }
`;
