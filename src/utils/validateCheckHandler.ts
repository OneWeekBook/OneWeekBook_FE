import {
  InputDataTypes,
  ValidateCheckTypes,
  CompareErrorTypes,
  SignUpDataTypes,
} from 'types/util';
import { codeRegex, emailRegex, passwordRegex } from 'constants/regex';

export const authEmailValidateHandler = (
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

export const passwordValidateHandler = (
  values: SignUpDataTypes,
  error: CompareErrorTypes,
) => {
  if (values.password && !passwordRegex.test(values.password)) {
    error.setPassError(true);
  } else if (values.password && passwordRegex.test(values.password)) {
    error.setPassError(false);
  }

  if (
    !error.passError &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    error.setPassCompareError(true);
  } else if (
    !error.passError &&
    values.confirmPassword &&
    values.password === values.confirmPassword
  ) {
    error.setPassCompareError(false);
  }
};
