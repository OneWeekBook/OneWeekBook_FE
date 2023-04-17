import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewItemType } from 'types/review';
import BestBookCard from 'components/modules/cards/BestBookCard';
import MainListTitle from '../MainListTitle';
import SlideButton from '../../common/SlideButton';

function Index() {
  const [idx, setIdx] = useState(0);
  const reviews = useSelector(
    (state: AppStateType) => state.review.reviews,
    shallowEqual,
  );

  return (
    <Wrapper>
      <MainListTitle
        title="Best Books"
        subTitle="사람들의 관심을 한몸에 받는 책"
      />
      <SlideWrapper>
        <BestListGridWrapper idx={idx}>
          {Array.isArray(reviews) &&
            !!reviews &&
            reviews.slice(0, 12).map((item: ReviewItemType, idx: number) => {
              return (
                <BestBookCard
                  key={item.id}
                  idx={idx + 1}
                  {...item}
                  count={item.countReviews}
                />
              );
            })}
        </BestListGridWrapper>
        <SlideButton dist="prev" idx={idx} setIdx={setIdx} totalPage={1} />
        <SlideButton dist="next" idx={idx} setIdx={setIdx} totalPage={1} />
      </SlideWrapper>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 700px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 350px;
  }
`;

const SlideWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const BestListGridWrapper = styled.div<{ idx: number }>`
  transform: translateX(${({ idx }) => 0 - idx * 1000}px);
  transition-duration: 0.5s;
  width: 100%;
  min-height: 150px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  gap: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 710}px);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 360}px);
  }
`;
