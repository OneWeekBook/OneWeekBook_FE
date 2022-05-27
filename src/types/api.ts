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

export type ChangeNickTypes = {
  nick: string;
  id: number;
};

export type ChangePasswordTypes = {
  email: string;
  password: string;
};

export type RemoveUserTypes = {
  id: number;
  password: string;
};

export type MyLibraryTypes = {
  userId: number;
  progress: number;
};

export type MyLibraryAddTypes = {
  userId: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  img: string;
};

export type MyLibraryModifyTypes = {
  progress: number;
  isbn: string;
  userId: number;
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
  sortby: string;
};
