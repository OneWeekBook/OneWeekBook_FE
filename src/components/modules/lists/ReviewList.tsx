import styled from 'styled-components';
import { ReviewListType } from 'types/module';
import { ReviewResponseTypes } from 'types/response';
import ReviewBookCard from 'components/modules/cards/ReviewBookCard';

function ReviewList({ reviews }: ReviewListType) {
  return (
    <ReviewListModule>
      {Array.isArray(reviews) &&
        !!reviews &&
        reviews.map((item: ReviewResponseTypes) => (
          <ReviewBookCard key={item.id} {...item} count={item.countReviews} />
        ))}
    </ReviewListModule>
  );
}

export default ReviewList;

const ReviewListModule = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
