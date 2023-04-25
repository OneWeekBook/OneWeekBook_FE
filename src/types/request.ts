export interface ActionsTypes {
  type: string;
  payload?: any;
  error?: any;
}

export interface SignInRequestTypes {
  email: string;
  password: string;
}

export interface SignUpRequestTypes {
  email: string;
  username: string;
  password: string;
  nick: string;
}

export interface LibraryAddRequestTypes {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  img: string;
}

export interface ParagraphRequestType {
  bookId: number;
}

export interface ParagraphAddRequestTypes {
  bookId: number;
  paragraph: string;
}

export interface DeleteRequestType {
  id: number;
}

export interface ReviewAddRequestTypes {
  bookId: number;
  review: string;
  rating: number;
}

export interface ReviewRequestTypes {
  start: number;
  sortby: string;
}

export interface BookRequestTypes {
  isbn: number;
  start: number;
  sortby: string;
}
