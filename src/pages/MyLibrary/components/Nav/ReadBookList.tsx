import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import { useToggle } from 'hooks/useToggle';
import BookItem, { BooksType } from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';

function ReadBookList() {
  const [id, setId] = useState<number>(-1);
  const [readToggle, readToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<BooksType>();

  useLayoutEffect(() => {
    if (id !== -1)
      setBookData({
        ...BookItems.filter((item: BooksType) => item.id === id)[0],
      });
    return () => {
      setId(-1);
    };
  }, [id]);

  return (
    <>
      <Wrapper>
        {BookItems.map(
          (item: BooksType) =>
            item.role === 'read' && (
              <BookItem
                key={item.id}
                {...item}
                handleToggle={readToggleIsOn}
                handleReviewToggle={readToggleIsOn}
                onClick={() => setId(item.id)}
              />
            ),
        )}
      </Wrapper>
      {readToggle && bookData && (
        <WriteCommentModal {...bookData} readToggleIsOn={readToggleIsOn} />
      )}
    </>
  );
}

export default ReadBookList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
