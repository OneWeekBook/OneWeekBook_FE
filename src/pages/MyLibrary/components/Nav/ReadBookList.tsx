import React from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import BookItem, { BooksType } from '../_item/BookItem';

function ReadBookList() {
  return (
    <Wrapper>
      {BookItems.map(
        (item: BooksType) =>
          item.role === 'read' && <BookItem key={item.id} {...item} />,
      )}
    </Wrapper>
  );
}

export default ReadBookList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin: auto;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 95%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
