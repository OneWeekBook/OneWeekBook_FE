import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { NewReviewTypes } from 'types/main';
import NewReivewItem from './NewReivewItem';

function NewReviewList() {
  const { newReviews } = useSelector((state: any) => state.newReview);
  const [end, setEnd] = useState(5);

  const onClick = () => {
    if (end < 20) {
      setEnd(end + 5);
    }
  };

  return (
    <Wrapper>
      <NewReviewTitle>따끈따끈한 새 리뷰</NewReviewTitle>
      <div>
        {newReviews.length &&
          newReviews
            .slice(0, end)
            .map((item: NewReviewTypes, idx: number) => (
              <NewReivewItem key={item.id} {...item} idx={idx} />
            ))}
      </div>
      <ButtonWrapper>
        <Button onClick={onClick}>더 보기</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default NewReviewList;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const NewReviewTitle = styled.p`
  font-size: 25px;
  margin-bottom: 22px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 20px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 38px;
  font-size: 16px;
  font-weight: 700;
`;
