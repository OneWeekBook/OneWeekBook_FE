import React, { useState } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import { InfoTypes, LibraryItemTypes } from 'types/book';
import { useSelector } from 'react-redux';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';
import WriteReviewModal from '../Modal/WriteReviewModal';

function DoneBookList() {
  const [isbn, setIsbn] = useState<string>('');
  const [commentToggle, commentToggleIsOn] = useToggle(false);
  const [reivewToggle, reviewToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<InfoTypes>({
    progress: 0,
    title: '',
    author: '',
    startTime: null,
    endTime: null,
  });
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  return (
    <>
      <Wrapper>
        {userBookList.length > 0 &&
          userBookList.map((item: LibraryItemTypes) => (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={commentToggleIsOn}
              handleReviewToggle={reviewToggleIsOn}
              onClick={() => {
                setIsbn(item.isbn);
                setBookData({
                  progress: item.progress,
                  title: item.title,
                  author: item.author,
                  startTime: item.startTime,
                  endTime: item.endTime,
                });
              }}
            />
          ))}
      </Wrapper>
      {commentToggle && bookData && (
        <WriteCommentModal bookData={bookData} toggleIsOn={commentToggleIsOn} />
      )}
      {reivewToggle && bookData && (
        <WriteReviewModal bookData={bookData} toggleIsOn={reviewToggleIsOn} />
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
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
