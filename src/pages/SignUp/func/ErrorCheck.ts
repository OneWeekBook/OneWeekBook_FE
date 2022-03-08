import { passwordRegex } from 'lib/Regex';

type SignUpType = {
  username: string;
  nick: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  passError: boolean;
  setPassError: React.Dispatch<React.SetStateAction<boolean>>;
  passCompareError: boolean;
  setPassCompareError: React.Dispatch<React.SetStateAction<boolean>>;
  registerDone: boolean;
  setRegisterDone: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useErrorCheck(): {
  handleError: (values: SignUpType, error: ErrorType) => void;
} {
  const handleError = (values: SignUpType, error: ErrorType) => {
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

    if (
      values.username &&
      values.nick &&
      !error.passError &&
      !error.passCompareError
    )
      error.setRegisterDone(false);
    else error.setRegisterDone(true);
  };

  return { handleError };
}
