import { showToast } from 'common/Toast';
import { PATH_URL } from 'constants/path';
import useRouter from 'hooks/useRouter';

export function signUpErrorHandler(): {
  handleSignUpError: (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
} {
  const { routeTo } = useRouter();

  const handleSignUpError = (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (type) {
      case 200:
        showToast('success', '회원가입 완료, 로그인을 진행해주세요.');
        routeTo(PATH_URL.SIGN_IN);
        error(false);
        break;
      case 400:
      case 500:
      case 501:
        error(true);
        break;
      default:
        break;
    }
  };

  return { handleSignUpError };
}
