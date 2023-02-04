import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';

type PropsType = {
  count: number;
};

function ReivewItem({
  img,
  title,
  author,
  isbn,
  count,
}: React.PropsWithChildren<ReviewItemType> & PropsType) {
  return (
    <ItemOuter>
      <ReviewCount>
        <img
          src={`${process.env.PUBLIC_URL}/assets/func/review-white.png`}
          alt="review count"
        />
        <p>{count}</p>
      </ReviewCount>
      <ItemInner>
        <Link to={`/review/${isbn}?sortby=recommend`}>
          <ImgWrapper>
            <img src={img} alt="book img" />
          </ImgWrapper>
        </Link>
        <ItemTitle>
          {title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
        </ItemTitle>
        <ItemAuthor>
          {author && author.replaceAll('<b>', '').replaceAll('</b>', '')}
        </ItemAuthor>
      </ItemInner>
    </ItemOuter>
  );
}

export default ReivewItem;

const ItemOuter = styled.div`
  position: relative;
  width: 190px;
  border: 5px solid #f07055;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 30px 0px 10px;
`;

const ReviewCount = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f07055;
  border-radius: 0px 0px 0px 5px;
  text-align: center;
  padding-bottom: 2px;
  width: 60px;
  font-size: 16px;
  color: #fff;
`;

const ItemInner = styled.div`
  width: 150px;
  margin: 0 auto;
`;

const ImgWrapper = styled.div`
  object-fit: cover;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;

const ItemTitle = styled.p`
  height: 44px;
  font-size: 16px;
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
  font-size: 14px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
