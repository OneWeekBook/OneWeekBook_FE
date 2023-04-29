import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';
import { ReviewResponseTypes } from 'types/response';
import { ReviewBookCardType } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import { PATH_URL } from 'constants/path';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import MultiText from 'components/atoms/texts/MultiText';

function ReivewItem({
  img,
  title,
  author,
  isbn,
  count,
}: React.PropsWithChildren<ReviewResponseTypes> & ReviewBookCardType) {
  return (
    <ReviewBookCardContainer>
      <MultiText
        className="review"
        imageSrc={FUNC_IMAGE.REVIEW}
        imageAlt="review count"
        imageSize={20}
        content={count}
        fontColor={theme.color.COLOR_WHITE}
        fontSize={1.6}
      />
      <BookInfo to={`${PATH_URL.REVIEW}/${isbn}?sort=recommend`}>
        <DefaultImage imageSrc={img} imageAlt="book img" pc={[140, 200]} />
        <DefaultText
          className="booktitle"
          content={title && title.replaceAll('<b>', '').replaceAll('</b>', '')}
          fontSize={1.6}
          fontWeight={700}
        />
        <DefaultText
          className="bookauthor"
          content={
            author && author.replaceAll('<b>', '').replaceAll('</b>', '')
          }
          fontSize={1.4}
          fontWeight={300}
        />
      </BookInfo>
    </ReviewBookCardContainer>
  );
}

export default ReivewItem;

const ReviewBookCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  max-width: 190px;
  width: 100%;
  border: 5px solid ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px 0px 10px;
  transition: 0.5s;
  &:hover {
    background-color: ${({ theme }) => theme.color.COLOR_LEMON_CHIFFON};
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 165px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
  }
`;

const BookInfo = styled(Link)`
  width: 140px;
  margin: 0 auto;
  img {
    border-radius: 0px 5px 5px 0px;
  }
  .booktitle {
    height: 42px;
    line-height: 2rem;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookauthor {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
