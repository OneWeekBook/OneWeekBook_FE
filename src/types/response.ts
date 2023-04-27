import { LibraryBookTypes } from './page';

export interface BookResponseTypes {
  author: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  link: string;
  price: string;
  pubdate: string;
  publisher: string;
  title: string;
}

export interface CategoryResponseTypes {
  id: number;
  parentId: number | null;
  categoryId: number;
  categoryName: string;
  depth: number;
}

export interface FavoriteResponseTypes {
  createdAt: string;
  id: number;
  state: number;
  updatedAt: string;
  user: UserResponseTypes;
  userBookListId: number;
  userId: number;
}

export interface LibraryResponseTypes extends LibraryBookTypes {
  img: string;
  publisher: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface ParagraphResponseTypes {
  id: number;
  bookId: number;
  paragraph: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponseTypes {
  id: number;
  author: string;
  countReviews: number;
  img: string;
  isbn: string;
  publisher: string;
  title: string;
}

export interface ReviewBookResponseTypes {
  author: string;
  countReviews: number;
  id: number;
  img: string;
  isbn: string;
  publisher: string;
  ratingAverage: number;
  title: string;
}

export interface UserResponseTypes {
  id: number;
  username: string;
  email: string;
  nick: string;
  role: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserReviewResponseTypes {
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
}

export interface UserBookResponseTypes extends LibraryResponseTypes {
  review: string;
  rating: number;
  reviewCreationTime: string;
}

export interface NewReviewResponseTypes extends UserBookResponseTypes {
  user: UserResponseTypes;
}

export interface SuccessResponseTypes {
  message: string;
  sucess: boolean;
}

export interface ResponseSignInSuccess extends SuccessResponseTypes {
  accessToken: string;
}

export interface ResponseAuthUserSuccess {
  bookData: UserBookResponseTypes;
  userData: UserResponseTypes;
}

export interface ResponseCategorySuccess extends SuccessResponseTypes {
  categories: CategoryResponseTypes[];
}

export interface ResponseFavoriteSuccess extends SuccessResponseTypes {
  likeData: FavoriteResponseTypes[];
}

export interface ResponseNewReviewSuccess extends SuccessResponseTypes {
  reviews: NewReviewResponseTypes[];
}

export interface ResponseReviewSuccess extends SuccessResponseTypes {
  countAllReviewBooks: number;
  reviews: ReviewResponseTypes[];
}

export interface ResponseDetailSuccess extends SuccessResponseTypes {
  bookData: ReviewBookResponseTypes[];
  countAllReviewBooks: number;
  reviewData: UserReviewResponseTypes[];
}

export interface ResponseSearchSuccess extends SuccessResponseTypes {
  books: BookResponseTypes[];
}
