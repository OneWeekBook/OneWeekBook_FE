import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReviewItemType } from 'types/review';
import BestItem from './BestItem';

type CountType = {
  isbn: string;
  count: number;
};

function Index() {
  const { reviews, count } = useSelector((state: any) => state.review);

  return (
    <Wrapper>
      <BestListTitle>사람들의 관심을 한 몸에 받은 책</BestListTitle>
      <BestListGridWrapper>
        {reviews.length > 0 &&
          count.length > 0 &&
          reviews.slice(0, 9).map((item: ReviewItemType, idx: number) => {
            const index = count.findIndex(
              (i: CountType) => i.isbn === item.isbn,
            );
            return (
              <BestItem
                key={item.id}
                idx={idx + 1}
                {...item}
                count={count[index].count}
              />
            );
          })}
      </BestListGridWrapper>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const BestListTitle = styled.p`
  font-size: 25px;
  margin-bottom: 32px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 20px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 18px;
  }
`;

const BestListGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
