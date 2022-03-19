import PagenationForm from 'components/Form/PagenationForm';
import { ReviewItems } from 'db/reviewdata';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewItem from './_item/ReviewItem';

export type ReviewItemType = {
  id: number;
  img: string;
  title: string;
  author: string;
  rating: number;
  total: number;
};

function ReviewList() {
  const [curIdx, setCurIdx] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(12);

  const handleChangeClick = (index: number) => {
    console.log(index);
    setEnd(index * 12);
    setStart(index * 12 - 11);
  };

  console.log(start, end);

  useEffect(() => {
    handleChangeClick(curIdx);
  }, [curIdx]);

  return (
    <Wrapper>
      <ReviewTitle>전체 리뷰 ({ReviewItems.length}건)</ReviewTitle>
      <ReviewListWrapper>
        {ReviewItems.slice(start - 1, end).map((item: ReviewItemType) => (
          <ReviewItem key={item.id} {...item} />
        ))}
      </ReviewListWrapper>
      <PagenationForm
        total={ReviewItems.length}
        curIdx={curIdx}
        setCurIdx={setCurIdx}
      />
    </Wrapper>
  );
}

export default ReviewList;

const Wrapper = styled.div`
  margin: 30px auto 50px;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const ReviewTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ReviewListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
`;
