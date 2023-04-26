import { InputDataTypes, RegCheckTypes } from 'types/hook';
import { codeRegex, emailRegex } from 'utils/Regex';

export function useRegexCheck(): {
  handleRegex: (values: InputDataTypes, regCheck: RegCheckTypes) => void;
} {
  const handleRegex = (values: InputDataTypes, regCheck: RegCheckTypes) => {
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
