import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getImgErr } from 'lib/ImageError';
import { ReviewItemType } from 'types/review';

type PropsType = {
  idx: number;
  count: number;
};

function BestBookCard({
  idx,
  author,
  img,
  isbn,
  publisher,
  title,
  count,
}: React.PropsWithChildren<ReviewItemType> & PropsType) {
  return (
    <CardContainer>
      <Link to={`/review/${isbn}?sort=recommend`}>
        <BookImage src={img} alt="book" onError={getImgErr} />
        <InfoWrapper>
          <p className="item-id">{idx}</p>
          <BookInfoWrapper>
            <TitleWrapper>
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
            </TitleWrapper>
            <CountInfoWrapper>
              <img
                src={`${process.env.PUBLIC_URL}/assets/func/comment.png`}
                alt="comment"
                width={20}
                height={20}
              />
              <p>{count}</p>
            </CountInfoWrapper>
          </BookInfoWrapper>
        </InfoWrapper>
      </Link>
    </CardContainer>
  );
}

export default BestBookCard;

const CardContainer = styled.div`
  width: 495px;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: black;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 345px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
  }
`;

const BookImage = styled.img`
  width: 90px;
  height: 135px;
  border-radius: 0px 5px 5px 0px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 150px;
    height: 225px;
    margin: 0 auto;
  }
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
    width: 40px;
    font-size: 20px;
    font-weight: 500;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
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

const TitleWrapper = styled.div`
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
    font-weight: 500;
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
  font-weight: 700;
  img {
    padding-right: 5px;
  }
  p {
    color: #f07055;
    padding-right: 15px;
  }
`;
