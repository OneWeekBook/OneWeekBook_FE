import { InputDataTypes, ValidateCheckTypes } from 'types/util';
import { codeRegex, emailRegex } from 'constants/regex';

export const validateCheckHandler = (
  values: InputDataTypes,
  validateCheck: ValidateCheckTypes,
) => {
  if (values.email && !emailRegex.test(values.email)) {
    validateCheck.setEmailValidate(false);
  } else if (values.email && emailRegex.test(values.email)) {
    validateCheck.setEmailValidate(true);
  }

  if (values.code && !codeRegex.test(values.code)) {
    validateCheck.setCodeValidate(false);
  } else if (values.code && codeRegex.test(values.code)) {
    validateCheck.setCodeValidate(true);
  }
};
