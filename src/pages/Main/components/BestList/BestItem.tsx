import React from 'react';
import styled from 'styled-components';
import { BestItemTypes } from 'types/main';

function BestItem({
  id,
  title,
  auth,
  review,
  recommend,
}: React.PropsWithChildren<BestItemTypes>) {
  return (
    <ItemWrapper>
      <BookImage
        src={`${process.env.PUBLIC_URL}/assets/main-bestlist-book.png`}
        alt="book"
      />
      <InfoWrapper>
        <p className="item-id">{id}</p>
        <BookInfoWrapper>
          <TitleWrapepr>
            <p className="item-title">{title}</p>
            <p className="item-auth">{auth}</p>
          </TitleWrapepr>
          <CountInfoWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/assets/main-bestlist-comment.png`}
              alt="comment"
              width={20}
              height={20}
            />
            <p>{review}</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/main-bestlist-recommend.png`}
              alt="recommend"
              width={20}
              height={20}
            />
            <p>{recommend}</p>
          </CountInfoWrapper>
        </BookInfoWrapper>
      </InfoWrapper>
    </ItemWrapper>
  );
}

export default BestItem;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
`;

const BookImage = styled.img`
  width: 100px;
  background-color: lightblue;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 100%;
  height: 100%;
  .item-id {
    text-align: center;
    width: 50px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const BookInfoWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const TitleWrapepr = styled.div`
  .item-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .item-auth {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  img {
    padding-right: 5px;
  }
  p {
    padding-right: 15px;
  }
`;
