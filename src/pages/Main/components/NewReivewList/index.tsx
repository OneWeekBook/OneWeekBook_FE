import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { NewReviewTypes } from 'types/main';
import NewReivewItem from './NewReivewItem';
import MainListTitle from '../MainListTitle';
import SlideButton from '../../common/SlideButton';

function NewReviewList() {
  const newReviews = useSelector(
    (state: AppStateType) => state.newReview.newReviews,
    shallowEqual,
  );
  const [idx, setIdx] = useState(0);

  return (
    <Wrapper>
      <MainListTitle title="Books Review" subTitle="따끈따끈한 새 리뷰" />
      <SlideWrapper>
        <NewReviewGridWrapper idx={idx}>
          {Array.isArray(newReviews) &&
            !!newReviews &&
            newReviews.map((item: NewReviewTypes) => (
              <NewReivewItem key={item.id} {...item} />
            ))}
        </NewReviewGridWrapper>
        <SlideButton dist="prev" idx={idx} setIdx={setIdx} totalPage={4} />
        <SlideButton dist="next" idx={idx} setIdx={setIdx} totalPage={4} />
      </SlideWrapper>
    </Wrapper>
  );
}

export default NewReviewList;

const Wrapper = styled.div`
  overflow: hidden;
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
  position: relative;
`;

const NewReviewGridWrapper = styled.div<{ idx: number }>`
  transform: translateX(${({ idx }) => 0 - idx * 1010}px);
  transition-duration: 0.5s;
  width: 100%;
  min-height: 150px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  gap: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 710}px);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    transform: translateX(${({ idx }) => 0 - idx * 360}px);
  }
`;
