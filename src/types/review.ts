export type ReviewItemType = {
  id: number
  author: string;
  countReviews: number;
  img: string;
  isbn: string;
  publisher: string;
  title: string;
};

export type ReviewBookTypes = {
  author: string;
  countReviews: number;
  id: number;
  img: string;
  isbn: string;
  publisher: string;
  ratingAverage: number;
  title: string;
};

export type ReviewDetailTypes = {
  id: number;
  likeCount: number;
  nick: string;
  oneLikeCount: number;
  rating: number;
  review: string;
  reviewCreationTime: string;
  role: number;
  zeroLikeCount: number;
  userId: number;
};