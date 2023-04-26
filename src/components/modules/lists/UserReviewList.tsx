import styled from 'styled-components';
import { ReviewInfoTypes } from 'types/module';
import { UserReviewResponseTypes } from 'types/response';
import ReviewUserCard from 'components/modules/cards/ReviewUserCard';

function UserReviewList({
  reviews,
  detailToggleIsOn,
  setCurReview,
}: ReviewInfoTypes) {
  return (
    <ReviewListWrapper>
      {Array.isArray(reviews) &&
        !!reviews &&
        reviews.map((item: UserReviewResponseTypes) => (
          <ReviewUserCard
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
