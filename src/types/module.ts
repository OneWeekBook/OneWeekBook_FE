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
