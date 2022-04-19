import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import MoveReadModal from 'components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MyLibraryRequest } from 'redux/reducers/MyLibrary';
import { LibraryItemTypes } from 'types/book';
import BookItem from '../_item/BookItem';

type PropsType = {
  userId: number;
};

function LikeBookList({ userId }: PropsType) {
  const dispatch = useDispatch();
  const [id, setId] = useState<number>(-1);
  const [likeToggle, likeToggleIsOn] = useToggle(false);
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  const moveReadClick = () => {
    likeToggleIsOn();
  };

  useEffect(() => {
    if (userId) dispatch(MyLibraryRequest({ userId, progress: 0 }));
  }, [userId]);

  return (
    <>
      <Wrapper>
        {userBookList.length > 0 &&
          userBookList.map((item: LibraryItemTypes) => (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={likeToggleIsOn}
              handleReviewToggle={likeToggleIsOn}
              onClick={() => setId(item.id)}
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
  margin: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
