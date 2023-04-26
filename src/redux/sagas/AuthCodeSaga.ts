import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthCodeFail,
  AuthCodeSuccess,
  AUTH_CODE_REQUEST,
} from '../reducers/AuthCode';

function AuthCodeAPI(data: { code: string }) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/auth/email`, data);
}

function* fetchAuthCodeSaga(action: any) {
  try {
    yield call(AuthCodeAPI, action.payload);
    yield put(AuthCodeSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(AuthCodeFail(error));
  }
}

export default function* watchAuthCode() {
  yield takeEvery(AUTH_CODE_REQUEST, fetchAuthCodeSaga);
}
