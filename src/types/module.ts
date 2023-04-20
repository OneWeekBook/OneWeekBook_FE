import { CategoryItemTypes } from './book';
import { ReviewDetailTypes, ReviewItemType } from './review';

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
  categories: CategoryItemTypes[];
  catgoryResult: CategoryItemTypes[];
  currentCategory: CategoryItemTypes[];
  handleCategoryFilter: (
    categoriesData: CategoryItemTypes[],
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
  handleSignout: () => void;
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

export interface ReviewListType {
  reviews: ReviewItemType[];
}

export interface ReviewUserCardType {
  handleClick: () => void;
}

export interface ReviewBookCardType {
  count: number;
}

export interface ReviewInfoTypes {
  reviews: ReviewDetailTypes[];
  detailToggleIsOn: () => void;
  setCurReview: React.Dispatch<React.SetStateAction<ReviewDetailTypes>>;
}

export interface SignUpTypes {
  email: string;
  authDone: boolean;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchInputTypes {
  curSubCategory: CategoryItemTypes[];
  curParentCategory: CategoryItemTypes[];
}

export interface TagLabelType {
  tags: Set<string>;
}
