import React, { useState } from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import { useToggle } from 'hooks/useToggle';
import BookItem, { BooksType } from '../_item/BookItem';

function ReadBookList() {
  const [id, setId] = useState<number>(-1);
  const [readToggle, readToggleIsOn] = useToggle(false);
  return (
    <Wrapper>
      {BookItems.map(
        (item: BooksType) =>
          item.role === 'read' && (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={readToggleIsOn}
              onClick={() => setId(item.id)}
            />
          ),
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
