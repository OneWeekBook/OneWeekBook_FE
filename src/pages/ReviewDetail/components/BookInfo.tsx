import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BookInfoWrapper from './_items/BookInfoWrapper';

function BookInfo() {
  const { bookData, reviewCount, ratingAverage } = useSelector(
    (state: any) => state.review,
  );
  return (
    <Wrapper>
      {bookData.title && (
        <BookInfoWrapper
          {...bookData}
          average={ratingAverage}
          count={reviewCount}
        />
      )}
    </Wrapper>
  );
}

export default BookInfo;

const Wrapper = styled.div`
  margin: 10px auto 50px;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;
