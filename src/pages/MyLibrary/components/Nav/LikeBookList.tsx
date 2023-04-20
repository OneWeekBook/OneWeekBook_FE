import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import {
  MyLibraryModifyRequest,
  MyLibraryRequest,
} from 'redux/reducers/MyLibrary';
import { navRead } from 'redux/reducers/Func';
import useToggle from 'hooks/useToggle';
import { LibraryItemTypes } from 'types/book';
import MoveReadModal from 'common/DefaultModal';
import BookItem from '../_item/BookItem';

function LikeBookList() {
  const dispatch = useDispatch();
  const [isbn, setIsbn] = useState<string>('');
  const [likeToggle, likeToggleIsOn] = useToggle(false);
  const isDeleteSuccess = useSelector(
    (state: AppStateType) => state.myLibrary.isDeleteSuccess,
  );
  const { userBookList } = useSelector(
    (state: AppStateType) => state.myLibrary,
    shallowEqual,
  );

  const moveReadClick = async () => {
    await dispatch(MyLibraryModifyRequest({ progress: 1, isbn }));
    likeToggleIsOn();
    dispatch(navRead());
  };

  useEffect(() => {
    if (isDeleteSuccess) dispatch(MyLibraryRequest({ progress: 0 }));
  }, [isDeleteSuccess]);

  return (
    <>
      {Array.isArray(userBookList) &&
        !!userBookList &&
        userBookList.map((item: LibraryItemTypes) => (
          <BookItem
            key={item.id}
            {...item}
            handleToggle={likeToggleIsOn}
            handleReviewToggle={likeToggleIsOn}
            onClick={() => {
              setIsbn(item.isbn);
            }}
          />
        ))}
      {likeToggle && (
        <MoveReadModal
          content="시작해볼까요?"
          contentSize={2.4}
          width={500}
          height={250}
          handleToggle={likeToggleIsOn}
          close
          okButtonTitle="독서 시작"
          cancelButtonTitle="나중에"
          handleOkClick={moveReadClick}
          handleCanCelClick={likeToggleIsOn}
        />
      )}
    </>
  );
}

export default LikeBookList;
