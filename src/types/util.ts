export interface InputDataTypes {
  email: string;
  code: string;
}

export interface ValidateCheckTypes {
  setEmailValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setCodeValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EmailStatusTypes {
  setEmailDone: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthCodeToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CodeStatusTypes {
  email: string;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
  setCodeValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CompareErrorTypes {
  passError: boolean;
  setPassError: React.Dispatch<React.SetStateAction<boolean>>;
  passCompareError: boolean;
  setPassCompareError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignUpDataTypes {
  username: string;
  nick: string;
  password: string;
  confirmPassword: string;
}
