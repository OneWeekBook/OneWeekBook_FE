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

export interface CodeErrorTypes {
  code: string;
  codeReg: boolean;
  codeErrorMsg: string;
  codeErrorStatus: number;
}

export interface CategoryProps {
  initialState: CategoryItemTypes;
  curParentCategory: CategoryItemTypes[];
  setCurParentCategory: React.Dispatch<
    React.SetStateAction<CategoryItemTypes[]>
  >;
  curChildCategory: CategoryItemTypes[];
  setCurChildCategory: React.Dispatch<
    React.SetStateAction<CategoryItemTypes[]>
  >;
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
