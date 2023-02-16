import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ActionEmail } from 'types/action';
import {
  AuthEmailFail,
  AuthEmailSuccess,
  AUTH_EMAIL_REQUEST,
} from '../reducers/AuthEmail';

function AuthEmailAPI(data: { email: string }) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/auth/code`, data);
}

function* fetchAuthEmailSaga(action: ActionEmail) {
  try {
    yield call(AuthEmailAPI, action.payload);
    yield put(AuthEmailSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(AuthEmailFail(error));
  }
}

export default function* watchAuthEmail() {
  yield takeEvery(AUTH_EMAIL_REQUEST, fetchAuthEmailSaga);
}
