export interface ActionsTypes {
  type: string;
  payload?: any;
  error?: any;
}

export interface ApiSignIn {
  email: string;
  password: string;
}

export interface ApiSignUp {
  email: string;
  username: string;
  password: string;
  nick: string;
}

export interface ApiMyLibraryAdd {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  img: string;
}

export interface ApiMyLibraryModify {
  userId: number;
  progress: number;
  isbn: string;
}

export interface ApiParagraph {
  bookId: number;
}

export interface ApiParagraphAdd {
  bookId: number;
  paragraph: string;
}

export interface ApiDelete {
  id: number;
}

export interface ApiUserReviewAdd {
  bookId: number;
  review: string;
  rating: number;
}

export interface ApiReview {
  start: number;
  sortby: string;
}

export interface ApiReivewDetail {
  isbn: number;
  start: number;
  sortby: string;
}

export interface ApiSearch {
  d_categ?: string;
  title?: string;
  start: number;
  display: number;
}

export interface ApiUserReview {
  id: number;
  review: string;
  rating: number;
}
