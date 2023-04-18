import { CategoryItemTypes } from './book';

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
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
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
