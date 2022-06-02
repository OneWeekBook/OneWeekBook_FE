export type ReviewItemType = {
  id: number;
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

export type LikeDataTypes = {
  createdAt: string;
  id: number;
  state: number;
  updatedAt: string;
  user: UserTypes;
  userBookListId: number;
  userId: number;
};

export type UserTypes = {
  createdAt: string;
  email: string;
  id: number;
  nick: string;
  role: number;
  updatedAt: string;
  username: string;
};
