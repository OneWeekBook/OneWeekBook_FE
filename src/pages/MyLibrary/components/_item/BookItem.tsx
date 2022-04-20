import React from 'react';
import styled from 'styled-components';
import { SetStartDate } from 'lib/SetDate';
import { LibraryItemTypes } from 'types/book';

type ClickType = {
  handleToggle: () => void;
  handleReviewToggle: () => void;
  onClick: (id: number) => void;
};

function BookItem({
  id,
  img,
  progress,
  title,
  author,
  publisher,
  startTime,
  endTime,
  handleToggle,
  handleReviewToggle,
  onClick,
}: LibraryItemTypes & ClickType) {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={img} alt="book" />
      </ImgWrapper>
      <InfoWrapper>
        <div>
          <p className="bookTitle">
            {title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </p>
          <p className="bookAuthor">
            {author.replaceAll('<b>', '').replaceAll('</b>', '')}
          </p>
          <p className="bookPublisher">{publisher}</p>
          {startTime && <p>독서 시작: {SetStartDate(startTime)}</p>}
          {endTime && <p>독서 완료: {SetStartDate(endTime)}</p>}
        </div>
        <ButtonWrapper>
          {progress === 0 && (
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
          {(progress === 1 || progress === 2) && (
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
          {progress === 2 && (
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
  margin-left: 10px;
  width: 100%;
  .bookTitle {
    font-size: 16px;
    font-weight: 600;
  }
  .bookAuthor {
    font-size: 14px;
    font-weight: 600;
    color: gray;
  }
  .bookPublisher {
    font-size: 14px;
    font-weight: 600;
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
