import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import { LibraryItemTypes } from 'types/book';
import { useDispatch, useSelector } from 'react-redux';
import { MyLibraryInit, MyLibraryRequest } from 'redux/reducers/MyLibrary';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';

type PropsType = {
  userId: number;
};

function ReadBookList({ userId }: PropsType) {
  const dispatch = useDispatch();
  const [id, setId] = useState<number>(-1);
  const [readToggle, readToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<LibraryItemTypes>();
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  return (
    <>
      <Wrapper>
        {userBookList.length > 0 &&
          userBookList.map(
            (item: LibraryItemTypes) =>
              item.progress === 1 && (
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
        <WriteCommentModal {...bookData} toggleIsOn={readToggleIsOn} />
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
