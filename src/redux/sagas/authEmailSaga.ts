import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  authEmailFail,
  authEmailSuccess,
  AUTH_EMAIL_REQUEST,
} from 'redux/reducers/authEmailReducer';

function authEmailAPI(data: { email: string }) {
  return instance.post(API_URL.AUTH_CODE, data);
}

function* fetchAuthEmailSaga(action: {
  type: string;
  payload: { email: string };
}): any {
  try {
    yield call(authEmailAPI, action.payload);
    yield put(authEmailSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(authEmailFail(error));
  }
}

export default function* watchAuthEmail() {
  yield takeEvery(AUTH_EMAIL_REQUEST, fetchAuthEmailSaga);
}
