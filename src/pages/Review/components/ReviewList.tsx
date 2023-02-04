import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { ReviewItemType } from 'types/review';
import LoadingForm from 'components/Form/LoadingForm';
import ReviewItem from './ReviewItem';

function ReviewList() {
  const dispatch = useDispatch();
  const { reviews, reivewsTotal, reviewCount, moreReviews, isLoading } =
    useSelector((state: AppStateType) => state.review, shallowEqual);

  useEffect(() => {
    dispatch(ReviewsRequest({ start: 0, sortby: 'new' }));
    return () => {
      dispatch(ReviewInit());
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 100
      ) {
        if (moreReviews && !isLoading) {
          dispatch(ReviewsRequest({ start: reviewCount, sortby: 'new' }));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLoading, moreReviews]);

  return (
    <Wrapper>
      {Array.isArray(reviews) && !!reviews ? (
        <>
          <ReviewTitle>전체 리뷰 ({reivewsTotal}건)</ReviewTitle>
          <ReviewListWrapper>
            {reviews.map((item: ReviewItemType) => {
              return (
                <ReviewItem key={item.id} {...item} count={item.countReviews} />
              );
            })}
          </ReviewListWrapper>
        </>
      ) : (
        <LoadingForm />
      )}
    </Wrapper>
  );
}

export default ReviewList;

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

const ReviewTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ReviewListWrapper = styled.div`
  display: grid;
  margin-top: 30px;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px 10px;
  min-height: 600px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
