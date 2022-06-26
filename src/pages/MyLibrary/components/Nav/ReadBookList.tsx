import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  MyLibraryModifyRequest,
  MyLibraryRequest,
} from 'redux/reducers/MyLibrary';
import { navDone } from 'redux/reducers/Func';
import useToggle from 'hooks/useToggle';
import { InfoTypes, LibraryItemTypes } from 'types/book';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/CommentModal';

type PropsType = {
  userId: number;
};

function ReadBookList({ userId }: PropsType) {
  const dispatch = useDispatch();
  const [isbn, setIsbn] = useState<string>('');
  const [bookId, setBookId] = useState<number>(-1);
  const [readToggle, readToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<InfoTypes>({
    progress: 0,
    title: '',
    author: '',
    startTime: null,
    endTime: null,
  });
  const { userBookList, isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.myLibrary,
  );
  const { initSuccess } = useSelector((state: AppStateType) => state.paragraph);

  const moveDoneClick = async () => {
    await dispatch(MyLibraryModifyRequest({ progress: 2, isbn, userId }));
    readToggleIsOn();
    dispatch(navDone());
  };

  useEffect(() => {
    if (isDeleteSuccess) dispatch(MyLibraryRequest({ userId, progress: 1 }));
  }, [isDeleteSuccess]);

  return (
    <>
      <Wrapper>
        {Array.isArray(userBookList) &&
          !!userBookList &&
          userBookList.map((item: LibraryItemTypes) => (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={readToggleIsOn}
              handleReviewToggle={readToggleIsOn}
              onClick={() => {
                setIsbn(item.isbn);
                setBookId(item.id);
                setBookData({
                  progress: item.progress,
                  title: item.title,
                  author: item.author,
                  startTime: item.startTime,
                  endTime: null,
                });
              }}
            />
          ))}
      </Wrapper>
      {readToggle && initSuccess && (
        <WriteCommentModal
          bookId={bookId}
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
  margin: 10px auto 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    width: 95%;
  }
  @media (max-width: 660px) {
    grid-template-columns: 1fr;
  }
`;
