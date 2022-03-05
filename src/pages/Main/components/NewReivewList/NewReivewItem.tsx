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
        <img
          src={`${process.env.PUBLIC_URL}/assets/main-bestlist-comment.png`}
          alt="comment"
          width={25}
          height={25}
        />
        <p>{review}</p>
        <img
          src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
          alt="recommend"
          width={25}
          height={25}
        />
        <p>{recommend}</p>
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
  }
`;

const BookTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  p:first-child {
    font-size: 20px;
    font-weight: 700;
    margin-right: 10px;
  }
  p:last-child {
    font-size: 16px;
    font-weight: 500;
  }
`;

const CountInfoWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  img {
    padding-right: 5px;
  }
  p {
    padding-right: 15px;
  }
`;
