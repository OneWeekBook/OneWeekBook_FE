import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReviewRequest } from 'redux/reducers/Review';
import useToggle from 'hooks/useToggle';
import { ReviewDetailTypes } from 'types/review';
import ReviewDetailModal from './Modal/ReivewDetailModal';
import ReviewItem from './_items/ReivewItem';

function ReviewInfo() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(`${location.search.split('=')[1]}`);
  const [detailToggle, detailToggleIsOn] = useToggle(false);
  const { reviews, bookData } = useSelector((state: any) => state.review);
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

  useEffect(() => {
    dispatch(
      ReviewRequest({
        isbn: Number(location.pathname.split('/')[2]),
        sortby: sortBy,
      }),
    );
  }, [sortBy, detailToggle]);

  const handleSortClick = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <Wrapper>
      <p className="title">
        {bookData.title &&
          bookData.title.replaceAll('<b>', '').replaceAll('</b>', '')}{' '}
        평가
      </p>
      <SortButton
        className="recommendBtn"
        type="button"
        isSelected={sortBy === 'recommend'}
        onClick={() => handleSortClick('recommend')}
      >
        추천 순
      </SortButton>
      <SortButton
        className="newBtn"
        type="button"
        isSelected={sortBy === 'new'}
        onClick={() => handleSortClick('new')}
      >
        최신 순
      </SortButton>
      <ReviewListWrapper>
        {reviews.length &&
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
        />
      )}
    </Wrapper>
  );
}

export default ReviewInfo;

const Wrapper = styled.div`
  margin: 10px auto 50px;
  width: 100%;
  height: auto;
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .recommendBtn {
    box-sizing: border-box;
    border: none;
    border-right: 1px solid black;
    background-color: white;
    height: 20px;
    padding-right: 10px;
    font-size: 16px;
  }
  .newBtn {
    box-sizing: border-box;
    border: none;
    background-color: white;
    height: 20px;
    padding: 0 10px;
    font-size: 16px;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const SortButton = styled.button<{ isSelected?: boolean }>`
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? 800 : 500)};
`;

const ReviewListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
`;
