import React from 'react';
import styled from 'styled-components';

export type BooksType = {
  id: number;
  img: string;
  role: string;
  title: string;
  author: string;
  startDate: null | string;
  endDate: null | string;
};

function BookItem({ id, img, title, author, startDate, endDate }: BooksType) {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={img} alt="book" />
      </ImgWrapper>
      <p className="bookTitle">{title}</p>
      <p className="bookAuthor">{author}</p>
      {startDate && <p>{startDate}</p>}
      {endDate && <p>{endDate}</p>}
    </Wrapper>
  );
}

export default BookItem;

const Wrapper = styled.div`
  margin-top: 10px;
  .bookTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .bookAuthor {
    font-size: 16px;
    font-weight: 600;
    color: gray;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;
