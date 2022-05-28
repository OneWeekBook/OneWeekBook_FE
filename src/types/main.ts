export type BestItemTypes = {
  id: number;
  title: string;
  auth: string;
  review: number;
  recommend: number;
};

export type ReviewDetailTypes = {
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

export type NewReviewTypes = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  img: string;
  isbn: string;
  progress: number;
  startTime: string;
  endTime: string;
  review: string;
  rating: number;
  reviewCreationTime: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: UserTypes;
};

export type UserTypes = {
  id: number;
  username: string;
  email: string;
  nick: string;
  role: number;
  createdAt: string;
  updatedAt: string;
};