export interface CompareErrorTypes {
  passError: boolean;
  setPassError: React.Dispatch<React.SetStateAction<boolean>>;
  passCompareError: boolean;
  setPassCompareError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CodeStatusTypes {
  email: string;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
  setCodeReg: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EmailStatusTypes {
  setEmailDone: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IntersectionObserverTypes {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export interface InputDataTypes {
  email: string;
  code: string;
}

export interface RegCheckTypes {
  setEmailReg: React.Dispatch<React.SetStateAction<boolean>>;
  setCodeReg: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignUpDataTypes {
  username: string;
  nick: string;
  password: string;
  confirmPassword: string;
}
