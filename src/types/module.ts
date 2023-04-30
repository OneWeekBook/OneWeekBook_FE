import {
  BookResponseTypes,
  CategoryResponseTypes,
  LibraryResponseTypes,
  ReviewResponseTypes,
  UserReviewResponseTypes,
  UserBookResponseTypes,
} from './response';
import { LibraryAddRequestTypes } from './request';
import { LibraryBookTypes } from './page';

export interface AuthMailTypes {
  authDone: boolean;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface BannerTypes {
  id: number;
  img: string;
}

export interface BestBookCardTypes {
  idx: number;
  count: number;
}

export interface BooksListType {
  searchArr: string[];
}

export interface CodeErrorTypes {
  code: string;
  codeReg: boolean;
  codeErrorMsg: string;
  codeErrorStatus: number;
}

export interface CategoryListProps {
  categories: CategoryResponseTypes[];
  catgoryResult: CategoryResponseTypes[];
  currentCategory: CategoryResponseTypes[];
  handleCategoryFilter: (
    categoriesData: CategoryResponseTypes[],
    id: number,
  ) => void;
}

export interface EmailErrorTypes {
  email: string;
  emailReg: boolean;
  emailDone: boolean;
  emailErrorMsg: string;
  emailErrorStatus: number;
}

export interface HeaderTypes {
  handleToggle: () => void;
  handleSignOut: () => void;
}

export interface InputFormTypes {
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LibraryBookListTypes {
  libraryBookList: LibraryResponseTypes[];
  handleLikeToggle: () => void;
  handleCommentToggle: () => void;
  handleReviewToggle: () => void;
  setBookData: React.Dispatch<React.SetStateAction<LibraryBookTypes>>;
}

export interface LibraryBookCardTypes {
  handleLikeToggle: () => void;
  handleCommentToggle: () => void;
  handleReviewToggle: () => void;
  onClick: (id: number) => void;
}

export interface LibraryMenuTypes {
  useId: number;
  navId: number;
}

export interface LikeAddTypes extends BookResponseTypes {
  userId?: number;
  handleFavoriteClick: ({
    title,
    author,
    publisher,
    isbn,
    img,
  }: LibraryAddRequestTypes) => void;
}

export interface NoneCardTypes {
  type: string;
}

export interface MainLabelTypes {
  title: string;
  subTitle: string;
  fontSize?: number;
}

export interface PaginationTypes {
  totalPage: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface ProgressBarTypes {
  limit: number;
  write: number;
  width: number;
  percent: number;
}

export interface ParagraphCardTypes {
  id: number;
  paragraph: string;
  deleteParagraphClick: (id: number) => void;
}

export interface ParagraphInputFormType {
  bookId: number;
}

export interface ReviewListType {
  reviews: ReviewResponseTypes[];
}

export interface ReviewUserCardType {
  handleClick: () => void;
}

export interface ReviewBookCardType {
  count: number;
}

export interface ReviewInfoTypes {
  reviews: UserReviewResponseTypes[];
  detailToggleIsOn: () => void;
  setCurReview: React.Dispatch<React.SetStateAction<UserReviewResponseTypes>>;
}

export interface RecommendFormTypes {
  recommend: number;
  setRecommend: React.Dispatch<React.SetStateAction<number>>;
}

export interface SignUpTypes {
  email: string;
  authDone: boolean;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchInputTypes {
  curSubCategory: CategoryResponseTypes[];
  curParentCategory: CategoryResponseTypes[];
}

export interface TagLabelType {
  tags: Set<string>;
}

export interface UserBookListType {
  userBooks: UserBookResponseTypes[];
}
