import React, { useState } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import { LibraryItemTypes } from 'types/book';
import { useDispatch, useSelector } from 'react-redux';
import { MyLibraryModifyRequest } from 'redux/reducers/MyLibrary';
import { navDone } from 'redux/reducers/Func';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';

type PropsType = {
  userId: number;
};

type InfoTypes = {
  progress: number;
  title: string;
  author: string;
  startTime: string | null;
};

function ReadBookList({ userId }: PropsType) {
  const dispatch = useDispatch();
  const [isbn, setIsbn] = useState<string>('');
  const [readToggle, readToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<InfoTypes>({
    progress: 0,
    title: '',
    author: '',
    startTime: '',
  });
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  const moveDoneClick = async () => {
    await dispatch(MyLibraryModifyRequest({ progress: 2, isbn, userId }));
    readToggleIsOn();
    dispatch(navDone());
  };

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
                  onClick={() => {
                    setIsbn(item.isbn);
                    setBookData({
                      progress: item.progress,
                      title: item.title,
                      author: item.author,
                      startTime: item.startTime,
                    });
                  }}
                />
              ),
          )}
      </Wrapper>
      {readToggle && bookData && (
        <WriteCommentModal
          bookData={bookData}
          toggleIsOn={readToggleIsOn}
          moveDoneClick={moveDoneClick}
        />
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
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
