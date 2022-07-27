import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  MyLibraryModifyRequest,
  MyLibraryRequest,
} from 'redux/reducers/MyLibrary';
import { navRead } from 'redux/reducers/Func';
import useToggle from 'hooks/useToggle';
import { LibraryItemTypes } from 'types/book';
import MoveReadModal from 'components/Modal';
import BookItem from '../_item/BookItem';

function LikeBookList() {
  const dispatch = useDispatch();
  const [isbn, setIsbn] = useState<string>('');
  const [likeToggle, likeToggleIsOn] = useToggle(false);
  const { isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.myLibrary,
  );
  const { userBookList } = useSelector(
    (state: AppStateType) => state.myLibrary,
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
      <Wrapper>
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
      </Wrapper>
      {likeToggle && (
        <MoveReadModal
          title="시작해볼까요?"
          titleSize={[24, 20]}
          width={500}
          height={250}
          handleToggle={likeToggleIsOn}
          close
          isOkBtn
          okBtnTitle="독서 시작"
          handleOkClick={moveReadClick}
          isCancelBtn
          cancelBtnTitle="나중에..."
          handleCanCelClick={likeToggleIsOn}
        />
      )}
    </>
  );
}

export default LikeBookList;

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
