import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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

function ReadBookList() {
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
    shallowEqual,
  );
  const initSuccess = useSelector(
    (state: AppStateType) => state.paragraph.initSuccess,
  );

  const moveDoneClick = async () => {
    await dispatch(MyLibraryModifyRequest({ progress: 2, isbn }));
    readToggleIsOn();
    dispatch(navDone());
  };

  useEffect(() => {
    if (isDeleteSuccess) dispatch(MyLibraryRequest({ progress: 1 }));
  }, [isDeleteSuccess]);

  return (
    <>
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
