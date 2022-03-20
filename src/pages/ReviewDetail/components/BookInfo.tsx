import React from 'react';
import styled from 'styled-components';
import BookInfoWrapper from './_items/BookInfoWrapper';

function BookInfo() {
  return (
    <Wrapper>
      <BookInfoWrapper />
      <ReviewInfoWrapper>
        <p>
          종합 평가: <span />
        </p>
      </ReviewInfoWrapper>
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

const ReviewInfoWrapper = styled.div`
  box-sizing: border-box;
  background-color: #08c1e9;
  border: 2px solid #1e90ff;
  line-height: 100px;
  font-size: 30px;
  padding-left: 20px;
`;
