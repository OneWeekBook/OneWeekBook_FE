import styled from 'styled-components';
import { ReviewDetailTypes } from 'types/review';
import { ReviewInfoTypes } from 'types/module';
import ReivewUserCard from 'components/modules/cards/ReivewUserCard';

function UserReviewList({
  reviews,
  detailToggleIsOn,
  setCurReview,
}: ReviewInfoTypes) {
  return (
    <ReviewListWrapper>
      {Array.isArray(reviews) &&
        !!reviews &&
        reviews.map((item: ReviewDetailTypes) => (
          <ReivewUserCard
            key={item.id}
            {...item}
            handleClick={() => {
              detailToggleIsOn();
              setCurReview(item);
            }}
          />
        ))}
    </ReviewListWrapper>
  );
}

export default UserReviewList;

const ReviewListWrapper = styled.div`
  max-width: 1000px;
  min-height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
  border-top: 3px solid ${({ theme }) => theme.color.COLOR_CORAL};
  padding: 20px 0px 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
