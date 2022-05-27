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
  publisher,
  isbn,
  count,
}: React.PropsWithChildren<ReviewItemType> & PropsType) {
  return (
    <ItemWrapper>
      <Link to={`/review/${isbn}`}>
        <ImgWrapper>
          <img src={img} alt="book img" />
        </ImgWrapper>
      </Link>
      <ItemTitle>
        {title.replaceAll('<b>', '').replaceAll('</b>', '')}
      </ItemTitle>
      <ItemAuthor>
        {author.replaceAll('<b>', '').replaceAll('</b>', '')}
      </ItemAuthor>
      <ItemCount>총 리뷰 ( {count} )</ItemCount>
    </ItemWrapper>
  );
}

export default ReivewItem;

const ItemWrapper = styled.div`
  width: 150px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemTitle = styled.p`
  height: 40px;
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

const ItemCount = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: gray;
`;
