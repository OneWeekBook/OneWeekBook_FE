export interface InputDataTypes {
  email: string;
  code: string;
}

export interface ValidateCheckTypes {
  setEmailValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setCodeValidate: React.Dispatch<React.SetStateAction<boolean>>;
}
