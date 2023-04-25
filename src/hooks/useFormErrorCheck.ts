import { passwordRegex } from 'utils/Regex';

interface SignUpType {
  username: string;
  nick: string;
  password: string;
  confirmPassword: string;
}

type ErrorType = {
  passError: boolean;
  setPassError: React.Dispatch<React.SetStateAction<boolean>>;
  passCompareError: boolean;
  setPassCompareError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useFormErrorCheck(): {
  handleFormError: (values: SignUpType, error: ErrorType) => void;
} {
  const handleFormError = (values: SignUpType, error: ErrorType) => {
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
