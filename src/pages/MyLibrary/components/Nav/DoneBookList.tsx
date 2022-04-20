import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import { LibraryItemTypes } from 'types/book';
import { useSelector } from 'react-redux';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';
import WriteReviewModal from '../Modal/WriteReviewModal';

function DoneBookList() {
  const [id, setId] = useState<number>(-1);
  const [commentToggle, commentToggleIsOn] = useToggle(false);
  const [reivewToggle, reviewToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<LibraryItemTypes>();
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  return (
    <>
      <Wrapper>
        {userBookList.length > 0 &&
          userBookList.map(
            (item: LibraryItemTypes) =>
              item.progress === 2 && (
                <BookItem
                  key={item.id}
                  {...item}
                  handleToggle={commentToggleIsOn}
                  handleReviewToggle={reviewToggleIsOn}
                  onClick={() => setId(item.id)}
                />
              ),
          )}
      </Wrapper>
      {commentToggle && bookData && (
        <WriteCommentModal {...bookData} toggleIsOn={commentToggleIsOn} />
      )}
      {reivewToggle && bookData && (
        <WriteReviewModal {...bookData} toggleIsOn={reviewToggleIsOn} />
      )}
    </>
  );
}

export default DoneBookList;

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
