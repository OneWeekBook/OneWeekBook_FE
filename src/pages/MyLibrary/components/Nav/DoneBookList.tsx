import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { MyLibraryRequest } from 'redux/reducers/MyLibrary';
import useToggle from 'hooks/useToggle';
import { InfoTypes, LibraryItemTypes } from 'types/book';
import LibraryBookCard from 'components/modules/cards/LibraryBookCard';
import WriteCommentModal from '../Modal/CommentModal';
import WriteReviewModal from '../Modal/WriteReviewModal';

function DoneBookList() {
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState<number>(-1);
  const [commentToggle, commentToggleIsOn] = useToggle(false);
  const [reivewToggle, reviewToggleIsOn] = useToggle(false);
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
  const userReviewSuccess = useSelector(
    (state: AppStateType) => state.userReview.userReviewSuccess,
  );
  const initSuccess = useSelector(
    (state: AppStateType) => state.paragraph.initSuccess,
  );

  useEffect(() => {
    if (isDeleteSuccess) dispatch(MyLibraryRequest({ progress: 2 }));
  }, [isDeleteSuccess]);

  return (
    <>
      {Array.isArray(userBookList) &&
        !!userBookList &&
        userBookList.map((item: LibraryItemTypes) => (
          <LibraryBookCard
            key={item.id}
            {...item}
            handleToggle={commentToggleIsOn}
            handleReviewToggle={reviewToggleIsOn}
            onClick={() => {
              setBookId(item.id);
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
      {commentToggle && initSuccess && (
        <WriteCommentModal
          bookId={bookId}
          bookData={bookData}
          toggleIsOn={commentToggleIsOn}
        />
      )}
      {reivewToggle && userReviewSuccess && (
        <WriteReviewModal
          bookId={bookId}
          bookData={bookData}
          toggleIsOn={reviewToggleIsOn}
        />
      )}
    </>
  );
}

export default DoneBookList;
