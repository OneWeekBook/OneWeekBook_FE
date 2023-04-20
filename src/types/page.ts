import { ReviewDetailTypes } from './review';

export interface ReviewDetailModalTypes {
  userReview: ReviewDetailTypes;
  bookIsbn: number;
  reviewIndex: number;
  reviewSort: string;
  handleDetailToggle: () => void;
}
