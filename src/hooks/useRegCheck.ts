import { codeRegex, emailRegex } from 'utils/Regex';

type InputTypes = {
  email: string;
  code: string;
};

type RegCheckTypes = {
  setEmailReg: React.Dispatch<React.SetStateAction<boolean>>;
  setCodeReg: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useRegexCheck(): {
  handleRegex: (values: InputTypes, regCheck: RegCheckTypes) => void;
} {
  const handleRegex = (values: InputTypes, regCheck: RegCheckTypes) => {
    if (values.email && !emailRegex.test(values.email)) {
      regCheck.setEmailReg(false);
    } else if (values.email && emailRegex.test(values.email)) {
      regCheck.setEmailReg(true);
    }

    if (values.code && !codeRegex.test(values.code)) {
      regCheck.setCodeReg(false);
    } else if (values.code && codeRegex.test(values.code)) {
      regCheck.setCodeReg(true);
    }
  };

  return { handleRegex };
}
