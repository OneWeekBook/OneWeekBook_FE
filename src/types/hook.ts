export interface CompareErrorTypes {
  passError: boolean;
  setPassError: React.Dispatch<React.SetStateAction<boolean>>;
  passCompareError: boolean;
  setPassCompareError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IntersectionObserverTypes {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export interface SignUpDataTypes {
  username: string;
  nick: string;
  password: string;
  confirmPassword: string;
}
