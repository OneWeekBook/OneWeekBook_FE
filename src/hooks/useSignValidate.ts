import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppStateType } from 'redux/reducers';
import { PATH_URL } from 'constants/path';
import { showToast } from 'common/Toast';

function useSignValidate() {
  const router = useNavigate();
  const signUpErrorStatus = useSelector(
    (state: AppStateType) => state.signUp.signUpErrorStatus,
  );
  const { signInErrorStatus, signInErrorMsg } = useSelector(
    (state: AppStateType) => state.signIn,
    shallowEqual,
  );

  const signInErrorHandler = (
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (signInErrorStatus) {
      case 200:
        showToast('success', '로그인에 성공하였습니다.');
        router(PATH_URL.MAIN);
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

  const signUpErrorHandler = (
    error: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    switch (signUpErrorStatus) {
      case 200:
        showToast('success', '회원가입 완료, 로그인을 진행해주세요.');
        router(PATH_URL.SIGN_IN);
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

  return {
    signUpErrorStatus,
    signInErrorStatus,
    signInErrorMsg,
    signUpErrorHandler,
    signInErrorHandler,
  };
}

export default useSignValidate;
