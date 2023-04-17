import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';
import { getImgErr } from 'lib/ImageError';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import theme from 'styles/theme';

interface CardProps {
  idx: number;
  count: number;
}

function BestBookCard({
  idx,
  author,
  img,
  isbn,
  publisher,
  title,
  count,
}: React.PropsWithChildren<ReviewItemType> & CardProps) {
  return (
    <CardContainer to={`/review/${isbn}?sort=recommend`}>
      <DefaultImage
        imageSrc={img}
        imageAlt="book"
        className="bookimage"
        pc={[90, 135]}
        mobile={[150, 225]}
        onError={getImgErr}
      />
      <DefaultText className="card-id" content={idx} fontSize={2} />
      <BestBookInfo>
        <BookDetailInfo>
          <DefaultText
            className="booktitle"
            content={
              title && title.replaceAll('<b>', '').replaceAll('</b>', '')
            }
            fontSize={1.6}
          />
          <DefaultText
            className="bookdesc"
            content={
              author && author.replaceAll('<b>', '').replaceAll('</b>', '')
            }
            fontSize={1.4}
          />
          <DefaultText
            className="bookdesc"
            content={
              publisher &&
              publisher.replaceAll('<b>', '').replaceAll('</b>', '')
            }
            fontSize={1.4}
          />
        </BookDetailInfo>
        <CommentCountInfo>
          <DefaultImage
            imageSrc={`${process.env.PUBLIC_URL}/assets/func/comment.png`}
            imageAlt="comment"
            pc={[20, 20]}
          />
          <DefaultText
            content={count}
            fontColor={theme.color.COLOR_CORAL}
            fontSize={1.2}
          />
        </CommentCountInfo>
      </BestBookInfo>
    </CardContainer>
  );
}

export default BestBookCard;

const CardContainer = styled(Link)`
  width: 495px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.color.COLOR_BLACK};
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 345px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 170px;
    .card-id {
      display: none;
    }
  }
`;

const BestBookInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
  height: 100%;
`;

const BookDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .booktitle {
    font-weight: 700;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookdesc {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CommentCountInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
