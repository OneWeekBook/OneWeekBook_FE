import React from 'react';
import styled from 'styled-components';
import { NewReviewItemTypes } from 'types/main';

function NewReivewListItem({
  title,
  auth,
  subTitle,
  reviewer,
  overall,
  review,
  recommend,
}: React.PropsWithChildren<NewReviewItemTypes>) {
  return (
    <ItemWrapper>
      <BookImage
        src={`${process.env.PUBLIC_URL}/assets/main-bestlist-book.png`}
        alt="book"
      />
      <InfoWrapper>
        <BookTitleWrapper>
          <p>{title}</p>
          <p>{auth}</p>
        </BookTitleWrapper>
        <p className="subtitle">{subTitle}</p>
        <p className="reviewer">{reviewer}</p>
        <p className="overall">{overall}</p>
      </InfoWrapper>
      <CountInfoWrapper>
        <div className="countItem">
          <img
            src={`${process.env.PUBLIC_URL}/assets/main-bestlist-comment.png`}
            alt="comment"
          />
          <p>{review}</p>
        </div>
        <div className="countItem">
          <img
            src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
            alt="recommend"
          />
          <p>{recommend}</p>
        </div>
      </CountInfoWrapper>
    </ItemWrapper>
  );
}

export default NewReivewListItem;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 10px auto;
  border-bottom: 1px solid gray;
`;

const BookImage = styled.img`
  width: 120px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 90px;
  }
`;

const BookTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  .subtitle {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .reviewer {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .overall {
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
