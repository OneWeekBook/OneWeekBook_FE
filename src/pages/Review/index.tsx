import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewsRequest } from 'redux/reducers/Review';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Container from 'common/Container';
import TopButton from 'components/atoms/buttons/TopButton';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import ReviewList from 'components/modules/lists/ReviewList';
import LoadingForm from 'components/modules/commons/LoadingForm';

function Index() {
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
    <Container>
      <TotalReviewContainer>
        <DefaultLabel
          content={`전체 리뷰 (${reivewsTotal}건)`}
          fontSize={2.4}
          fontWeight={700}
          align="left"
        />
        <Bar />
        {Array.isArray(reviews) && !!reviews && (
          <ReviewList reviews={reviews} />
        )}
        <div ref={setTarget}>{isLoading && <LoadingForm />}</div>
        <TopButton />
      </TotalReviewContainer>
    </Container>
  );
}

export default Index;

const TotalReviewContainer = styled.div`
  margin: 20px auto 50px;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 700px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 350px;
  }
`;

const Bar = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  margin: 10px auto;
`;
