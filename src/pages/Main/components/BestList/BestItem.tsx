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
  height: 200px;
`;

const BookImage = styled.img`
  width: 150px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e6e6e6;
  margin-left: 10px;
  width: 100%;
  height: 100%;
  .item-id {
    width: 40px;
    font-size: 25px;
    font-weight: 600;
  }
`;

const BookInfoWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const TitleWrapepr = styled.div`
  .item-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .item-auth {
    font-size: 18px;
    font-weight: 500;
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  img {
    padding-right: 5px;
  }
  p {
    padding-right: 15px;
  }
`;
