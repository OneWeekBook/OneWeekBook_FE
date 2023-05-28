import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  AuthCodeFail,
  AuthCodeSuccess,
  AUTH_CODE_REQUEST,
} from 'redux/reducers/AuthCode';

function authCodeAPI(data: { code: string }) {
  return instance.post(API_URL.AUTH_EMAIL, data);
}

function* fetchAuthCodeSaga(action: {
  type: string;
  payload: { code: string };
}) {
  try {
    yield call(authCodeAPI, action.payload);
    yield put(AuthCodeSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(AuthCodeFail(error));
  }
}

export default function* watchAuthCode() {
  yield takeEvery(AUTH_CODE_REQUEST, fetchAuthCodeSaga);
}
