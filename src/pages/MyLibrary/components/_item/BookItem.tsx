import React from 'react';
import styled from 'styled-components';

export type BooksType = {
  id: number;
  img: string;
  role: string;
  title: string;
  author: string;
  startDate: null | string;
  endDate: null | string;
};

type ClickType = {
  handleToggle: () => void;
  handleReviewToggle: () => void;
  onClick: (id: number) => void;
};

function BookItem({
  id,
  img,
  role,
  title,
  author,
  startDate,
  endDate,
  handleToggle,
  handleReviewToggle,
  onClick,
}: BooksType & ClickType) {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={img} alt="book" />
      </ImgWrapper>
      <InfoWrapper>
        <div>
          <p className="bookTitle">{title}</p>
          <p className="bookAuthor">{author}</p>
          {startDate && <p>독서 시작: {startDate}</p>}
          {endDate && <p>독서 완료: {endDate}</p>}
        </div>
        <ButtonWrapper>
          {role === 'like' && (
            <button
              onClick={() => {
                handleToggle();
                onClick(id);
              }}
              type="button"
            >
              시작하기
            </button>
          )}
          {(role === 'read' || role === 'done') && (
            <button
              onClick={() => {
                handleToggle();
                onClick(id);
              }}
              type="button"
            >
              기록하기
            </button>
          )}
          {role === 'done' && (
            <button
              onClick={() => {
                handleReviewToggle();
                onClick(id);
              }}
              type="button"
            >
              리뷰하기
            </button>
          )}
        </ButtonWrapper>
      </InfoWrapper>
    </Wrapper>
  );
}

export default BookItem;

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  .bookTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .bookAuthor {
    font-size: 16px;
    font-weight: 600;
    color: gray;
  }
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  button {
    width: 100%;
  }
`;
