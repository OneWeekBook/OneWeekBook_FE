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
        <Link to={`/review/${isbn}?sort=recommend`}>
          <ImgWrapper>
            <img src={img} alt="book img" />
          </ImgWrapper>
          <ItemTitle>
            {title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </ItemTitle>
          <ItemAuthor>
            {author && author.replaceAll('<b>', '').replaceAll('</b>', '')}
          </ItemAuthor>
        </Link>
      </ItemInner>
    </ItemOuter>
  );
}

export default ReivewItem;

const ItemOuter = styled.div`
  cursor: pointer;
  position: relative;
  width: 190px;
  border: 5px solid #f07055;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 30px 0px 10px;
  &:hover {
    background-color: rgba(240, 112, 85, 0.3);
    transition: 0.5s;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 165px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
  }
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
  width: 140px;
  margin: 0 auto;
`;

const ImgWrapper = styled.div`
  object-fit: cover;
  height: 200px;
  margin-bottom: 5px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;

const ItemTitle = styled.p`
  height: 42px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
