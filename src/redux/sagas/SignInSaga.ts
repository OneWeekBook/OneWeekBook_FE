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

function SignInAPI(data: SignInRequestTypes) {
  return instance.post(API_URL.USER_LOGIN, data);
}

function* fetchSignInSaga(action: {
  type: string;
  payload: SignInRequestTypes;
}): object {
  try {
    const result = yield call(SignInAPI, action.payload);
    yield put(signInSuccess(result.data));
    saveAccessTokenToSessionStorage(result.data.accessToken);
    instance.defaults.headers.common.Authorization = result.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(signInFail(error));
  }
}

export default function* watchSignIn() {
  yield takeEvery(SIGN_IN_REQUEST, fetchSignInSaga);
}
