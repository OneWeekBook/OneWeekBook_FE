import React from 'react';
import { PATH_URL } from 'constants/path';
import { showToast } from 'common/Toast';
import useRouter from 'hooks/useRouter';

export function signInErrorHandler(): {
  handleSignInError: (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
} {
  const { routeTo } = useRouter();
  const handleSignInError = (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (type) {
      case 200:
        showToast('success', '로그인에 성공하였습니다.');
        routeTo(PATH_URL.MAIN);
        error(false);
        break;
      case 400:
      case 401:
      case 404:
      case 500:
      case 501:
        error(true);
        break;
      default:
        break;
    }
  };
  return { handleSignInError };
}
