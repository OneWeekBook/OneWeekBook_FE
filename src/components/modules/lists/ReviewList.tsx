import styled from 'styled-components';
import { ReviewListProp } from 'types/module';
import { ReviewItemType } from 'types/review';
import ReviewBookCard from 'components/modules/cards/ReviewBookCard';

function ReviewList({ reviews }: ReviewListProp) {
  return (
    <ReviewListContainer>
      {reviews.map((item: ReviewItemType) => {
        return (
          <ReviewBookCard key={item.id} {...item} count={item.countReviews} />
        );
      })}
    </ReviewListContainer>
  );
}

export default ReviewList;

const ReviewListContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px 10px;
  min-height: 600px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
