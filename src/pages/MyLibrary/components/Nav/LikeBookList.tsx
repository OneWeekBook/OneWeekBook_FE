import React, { useState } from 'react';
import styled from 'styled-components';
import { BookItems } from 'db/bookdata';
import { useToggle } from 'hooks/useToggle';
import MoveReadModal from 'components/Modal';
import BookItem, { BooksType } from '../_item/BookItem';

function LikeBookList() {
  const [id, setId] = useState<number>(-1);
  const [likeToggle, likeToggleIsOn] = useToggle(false);

  const moveReadClick = () => {
    likeToggleIsOn();
  };

  return (
    <>
      <Wrapper>
        {BookItems.map(
          (item: BooksType) =>
            item.role === 'like' && (
              <BookItem
                key={item.id}
                {...item}
                handleToggle={likeToggleIsOn}
                onClick={() => setId(item.id)}
              />
            ),
        )}
      </Wrapper>
      {likeToggle && (
        <MoveReadModal
          title="시작해볼까요?"
          titleSize={24}
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin: auto;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 95%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
