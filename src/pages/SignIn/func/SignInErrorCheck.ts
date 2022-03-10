import React from 'react';
import { useNavigate } from 'react-router-dom';

export function useSignInErrorCheck(): {
  handleSignInError: (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
} {
  const navigate = useNavigate();
  const handleSignInError = (
    type: number,
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (type) {
      case 200:
        alert('로그인에 성공하셨습니다.');
        navigate('/');
        error(false);
        break;
      case 400:
      case 401:
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
