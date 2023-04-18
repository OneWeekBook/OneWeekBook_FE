import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import { ReviewItemType } from 'types/review';
import LoadingForm from 'components/modules/commons/LoadingForm';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import TopButton from 'components/atoms/buttons/TopButton';
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

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && moreReviews && !isLoading) {
      dispatch(ReviewsRequest({ start: reviewCount, sortby: 'new' }));
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <Wrapper>
      {Array.isArray(reviews) && !!reviews && (
        <>
          <TitleWrapper>
            <ReviewTitle>전체 리뷰 ({reivewsTotal}건)</ReviewTitle>
          </TitleWrapper>
          <ReviewListWrapper>
            {reviews.map((item: ReviewItemType) => {
              return (
                <ReviewItem key={item.id} {...item} count={item.countReviews} />
              );
            })}
          </ReviewListWrapper>
        </>
      )}
      <div ref={setTarget}>{isLoading && <LoadingForm />}</div>
      <TopButton />
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f07055;
`;

const ReviewTitle = styled.p`
  height: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #f07055;
  padding-bottom: 10px;
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
