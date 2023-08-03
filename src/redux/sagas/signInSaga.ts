import axios from 'axios';
import instance from 'api/axios';
import { SignInRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import { call, put, takeEvery } from 'redux-saga/effects';
import { saveAccessTokenToSessionStorage } from 'utils/accessTokenHandler';
import {
  signInFail,
  signInSuccess,
  SIGN_IN_REQUEST,
} from 'redux/reducers/signInReducer';
import { authUserFail, authUserSuccess } from 'redux/reducers/authUserReducer';
import { authUserAPI, userLibraryAPI } from './authUserSaga';

function signInAPI(data: SignInRequestTypes) {
  return instance.post(API_URL.USER_LOGIN, data);
}

function* fetchSignInSaga(action: {
  type: string;
  payload: SignInRequestTypes;
}): object {
  try {
    const result = yield call(signInAPI, action.payload);
    yield put(signInSuccess(result.data));
    saveAccessTokenToSessionStorage(result.data.accessToken);
    instance.defaults.headers.common.Authorization = result.data.accessToken;
    const userData = yield call(authUserAPI);
    const bookData = yield call(userLibraryAPI, {
      userId: userData.data.user.id,
      progress: 2,
    });
    const userResult = {
      userData: userData.data.user,
      bookData: bookData.data.myList,
    };
    yield put(authUserSuccess(userResult));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(signInFail(error));
      yield put(authUserFail(error));
    }
  }
}

export default function* watchSignIn() {
  yield takeEvery(SIGN_IN_REQUEST, fetchSignInSaga);
}
