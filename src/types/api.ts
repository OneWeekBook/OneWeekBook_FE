export type ActionsTypes = {
  type: string;
  payload?: any;
  error?: any;
};

export type SignInTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  email: string;
  username: string;
  password: string;
  nick: string;
};

export type MyLibraryAddTypes = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  img: string;
};

export type ParagraphType = {
  bookId: number;
};

export type ParagraphAddTypes = {
  bookId: number;
  paragraph: string;
};

export type DeleteType = {
  id: number;
};

export type UserReviewTypes = {
  bookId: number;
  userId: number;
};

export type UserReviewAddTypes = {
  bookId: number;
  review: string;
  rating: number;
};

export type UserReviewModifyTypes = {
  id: number;
  review: string;
  rating: number;
};

export type ReviewTypes = {
  start: number;
  sortby: string;
};

export type ReivewDetailTypes = {
  isbn: number;
  start: number;
  sortby: string;
};
