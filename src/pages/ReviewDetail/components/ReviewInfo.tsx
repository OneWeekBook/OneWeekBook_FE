import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import useToggle from 'hooks/useToggle';
import { ReviewDetailTypes } from 'types/review';
import PagenationForm from 'components/Form/PagenationForm';
import ReviewDetailModal from './Modal/ReivewDetailModal';
import ReviewItem from './_items/ReivewItem';

function ReviewInfo() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isbn = Number(location.pathname.split('/')[2]);
  const [curIdx, setCurIdx] = useState<number>(1);
  const [sort, setSort] = useState('recommend');
  const [detailToggle, detailToggleIsOn] = useToggle(false);
  const { reviews, bookData } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(
      ReviewRequest({
        isbn,
        start: (curIdx - 1) * 10,
        sortby: sort,
      }),
    );
    return () => {
      dispatch(ReviewInit());
    };
  }, [sort, curIdx]);

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
      {detailToggle && (
        <ReviewDetailModal
          item={curReview}
          detailToggleIsOn={detailToggleIsOn}
          isbn={isbn}
          reviewCount={(curIdx - 1) * 10}
          sort={sort}
        />
      )}
      <PagenationForm
        total={bookData.countReviews}
        display={10}
        curIdx={curIdx}
        setCurIdx={setCurIdx}
      />
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
  border-top: 3px solid #f07055;
  padding: 20px 0px 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
