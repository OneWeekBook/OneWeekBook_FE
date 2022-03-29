import React from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import BookItem, { BooksType } from '../_item/BookItem';

function DoneBookList() {
  return (
    <Wrapper>
      {BookItems.map(
        (item: BooksType) =>
          item.role === 'done' && <BookItem key={item.id} {...item} />,
      )}
    </Wrapper>
  );
}

export default DoneBookList;

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
