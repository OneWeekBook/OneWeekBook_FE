import { BooksTypes, CategoryItemTypes, LibraryItemTypes } from './book';
import { NewReviewTypes, UserTypes } from './main';
import {
  LikeDataTypes,
  ReviewBookTypes,
  ReviewDetailTypes,
  ReviewItemType,
} from './review';

export interface SuccessType {
  message: string;
  sucess: boolean;
}

export interface ISignInSuccess extends SuccessType {
  accessToken: string;
}

export interface IAuthUserSuccess {
  bookData: LibraryItemTypes;
  userData: UserTypes;
}

export interface ICategorySuccess extends SuccessType {
  categories: CategoryItemTypes[];
}

export interface ILikeSuccess extends SuccessType {
  likeData: LikeDataTypes[];
}

export interface INewReviewSuccess extends SuccessType {
  reviews: NewReviewTypes[];
}

export interface IReviewSuccess extends SuccessType {
  countAllReviewBooks: number;
  reviews: ReviewItemType[];
}

export interface IReviewDetailSuccess extends SuccessType {
  bookData: ReviewBookTypes[];
  countAllReviewBooks: number;
  reviewData: ReviewDetailTypes[];
}

export interface IBookSearchSuccess extends SuccessType {
  books: BooksTypes[];
}
