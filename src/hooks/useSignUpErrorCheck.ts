import { useNavigate } from 'react-router-dom';
import { showToast } from 'common/Toast';

export function useSignUpErrorCheck(): {
  handleSignUpError: (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
} {
  const navigate = useNavigate();

  const handleSignUpError = (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (type) {
      case 200:
        showToast('success', '회원가입 완료, 로그인을 진행해주세요.');
        navigate('/sign-in');
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
