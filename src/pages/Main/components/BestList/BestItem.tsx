import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';

type PropsType = {
  idx: number;
  count: number;
};

function BestItem({
  idx,
  author,
  img,
  isbn,
  publisher,
  title,
  count,
}: React.PropsWithChildren<ReviewItemType> & PropsType) {
  return (
    <ItemWrapper>
      <Link to={`/review/${isbn}?sort=recommend`}>
        <BookImage src={img} alt="book" />
        <InfoWrapper>
          <p className="item-id">{idx}</p>
          <BookInfoWrapper>
            <TitleWrapepr>
              <p className="item-title">
                {title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
              </p>
              <p className="item-auth">
                {author && author.replaceAll('<b>', '').replaceAll('</b>', '')}
              </p>
              <p className="item-publisher">
                {publisher &&
                  publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
              </p>
            </TitleWrapepr>
            <CountInfoWrapper>
              <img
                src={`${process.env.PUBLIC_URL}/assets/main-bestlist-comment.png`}
                alt="comment"
                width={20}
                height={20}
              />
              <p>{count}</p>
            </CountInfoWrapper>
          </BookInfoWrapper>
        </InfoWrapper>
      </Link>
    </ItemWrapper>
  );
}

export default BestItem;

const ItemWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 150px;
    text-decoration: none;
    color: black;
  }
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
    flex-shrink: 0;
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
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-auth {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-publisher {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
