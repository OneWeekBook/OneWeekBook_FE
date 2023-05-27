import { CompareErrorTypes, SignUpDataTypes } from 'types/hook';
import { passwordRegex } from 'utils/Regex';

export function formErrorHandler(): {
  handleFormError: (values: SignUpDataTypes, error: CompareErrorTypes) => void;
} {
  const handleFormError = (
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

  return { handleFormError };
}
