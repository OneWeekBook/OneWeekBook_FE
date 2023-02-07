import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import useToggle from 'hooks/useToggle';
import { ReviewDetailTypes } from 'types/review';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import LoadingForm from 'components/Form/LoadingForm';
import ReviewDetailModal from './Modal/ReivewDetailModal';
import ReviewItem from './_items/ReivewItem';

function ReviewInfo() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sort, setSort] = useState('recommend');
  const [detailToggle, detailToggleIsOn] = useToggle(false);
  const { reviews, moreReviews, reviewCount, itemLoading } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(
      ReviewRequest({
        isbn: Number(location.pathname.split('/')[2]),
        start: 0,
        sortby: sort,
      }),
    );
    return () => {
      dispatch(ReviewInit());
    };
  }, [sort]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && moreReviews && !itemLoading) {
      dispatch(
        ReviewRequest({
          isbn: Number(location.pathname.split('/')[2]),
          start: reviewCount,
          sortby: sort,
        }),
      );
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const [curReview, setCurReview] = useState({
    id: -1,
    likeCount: 0,
    nick: '',
    oneLikeCount: 0,
    rating: 4,
    review: '',
    reviewCreationTime: '',
    role: 1,
    zeroLikeCount: 0,
    userId: -1,
  });

  return (
    <Wrapper>
      <SortButton
        className="recommendBtn"
        type="button"
        isSelected={sort === 'recommend'}
        onClick={() => setSort('recommend')}
      >
        추천 순
      </SortButton>
      <SortButton
        className="newBtn"
        type="button"
        isSelected={sort === 'new'}
        onClick={() => setSort('new')}
      >
        최신 순
      </SortButton>
      <ReviewListWrapper>
        {Array.isArray(reviews) &&
          !!reviews &&
          reviews.map((item: ReviewDetailTypes, index: number) => (
            <ReviewItem
              key={index}
              {...item}
              onClick={() => {
                detailToggleIsOn();
                setCurReview(item);
              }}
            />
          ))}
      </ReviewListWrapper>
      <div ref={setTarget}>{itemLoading && <LoadingForm />}</div>
      {detailToggle && (
        <ReviewDetailModal
          item={curReview}
          detailToggleIsOn={detailToggleIsOn}
        />
      )}
    </Wrapper>
  );
}

export default ReviewInfo;

const Wrapper = styled.div`
  margin: 10px auto;
  width: 1000px;
  min-height: 600px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 700px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 350px;
  }
`;

const SortButton = styled.button<{ isSelected?: boolean }>`
  width: 80px;
  text-align: left;
  border: none;
  background-color: white;
  cursor: pointer;
  color: #f07055;
  font-size: 24px;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
`;

const ReviewListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 10px;
  border-top: 2px solid #f07055;
  padding: 20px 0px 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
