import React, { useState } from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import { useToggle } from 'hooks/useToggle';
import BookItem, { BooksType } from '../_item/BookItem';

function DoneBookList() {
  const [id, setId] = useState<number>(-1);
  const [doneToggle, doneToggleIsOn] = useToggle(false);
  return (
    <Wrapper>
      {BookItems.map(
        (item: BooksType) =>
          item.role === 'done' && (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={doneToggleIsOn}
              onClick={() => setId(item.id)}
            />
          ),
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
