import React, { PropsWithChildren } from 'react';
import { SetDate } from 'lib/SetDate';
import styled from 'styled-components';
import { BooksTypes } from 'types/book';

function SearchItem({
  image,
  title,
  author,
  pubdate,
  publisher,
  description,
}: PropsWithChildren<BooksTypes>) {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={image} alt="book cover" />
      </ImgWrapper>
      <InfoWrapper>
        <p className="infoTitle" dangerouslySetInnerHTML={{ __html: title }} />
        <p>
          {author}&nbsp;&nbsp;{publisher}&nbsp;&nbsp;{SetDate(pubdate)}
        </p>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </InfoWrapper>
    </Wrapper>
  );
}

export default SearchItem;

const Wrapper = styled.div`
  display: flex;
  height: 200px;
`;

const ImgWrapper = styled.div`
  background-color: blue;
  flex-shrink: 0;
  width: 150px;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;

const InfoWrapper = styled.div`
  flex-glow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  .infoTitle {
    font-size: 18px;
    font-weight: 600;
  }
  padding-bottom: 5px;
  border-bottom: 2px solid #e6e6e6;
`;
