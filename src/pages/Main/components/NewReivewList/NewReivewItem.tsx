import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NewReviewTypes } from 'types/main';

function NewReivewListItem({
  img,
  title,
  author,
  publisher,
  review,
  rating,
  user,
}: React.PropsWithChildren<NewReviewTypes>) {
  return (
    <ItemWrapper>
      <Link to="/review">
        <BookImage src={img} alt="book"/>
        <InfoWrapper>
          <BookTitleWrapper>
            <p>{title && title.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
          </BookTitleWrapper>
          <p className="infomation"><span>{author && author.replaceAll('<b>', '').replaceAll('</b>', '')}</span>&nbsp;&nbsp;{publisher && publisher.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
          <p className="reviewer">{user.nick}</p>
          <p className="review">{review}</p>
        </InfoWrapper>
        <CountInfoWrapper>
          <div className="countItem">
            <img
              src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
              alt="recommend"
            />
            <p>{rating}</p>
          </div>
        </CountInfoWrapper>
      </Link>
    </ItemWrapper>
  );
}

export default NewReivewListItem;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  padding-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 150px;
    margin: 10px auto;
    text-decoration: none;
    color: black;
  }
  border-bottom: 1px solid gray;
`;

const BookImage = styled.img`
  width: 100px;
  height: 150px;
  flex-shrink: 0;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 90px;
  }
`;

const BookTitleWrapper = styled.div`
  align-items: center;
  margin-bottom: 5px;
  p:first-child {
    font-size: 18px;
    font-weight: 700;
    margin-right: 10px;
  }
  p:last-child {
    font-size: 16px;
    font-weight: 500;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p:first-child {
      font-size: 16px;
      font-weight: 600;
      margin-right: 10px;
    }
    p:last-child {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 10px;
  .infomation {
    font-size: 16px;
    margin-bottom: 5px;
    span {
      font-weight: 600;
    }
  }
  .reviewer {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .review {
    font-size: 16px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .subtitle {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .reviewer {
      font-size: 12px;
      margin-bottom: 15px;
    }
    .overall {
      font-size: 14px;
    }
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin: 0 10px;
  .countItem {
    display: flex;
    align-items: center;
    img {
      padding-right: 5px;
      width: 25px;
      height: 25px;
    }
    p {
      padding-right: 15px;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 12px;
    display: block;
    margin: 0 5px;
    .countItem {
      display: flex;
      align-items: center;
      img {
        padding-right: 5px;
        width: 20px;
        height: 20px;
      }
      p {
        padding-right: 0;
      }
    }
  }
`;
