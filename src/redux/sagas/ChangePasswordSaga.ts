import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ChangePasswordTypes } from 'types/api';
import {
  ChangePasswordFail,
  ChangePasswordSuccess,
  CHANGE_PASSWORD_REQUEST,
} from '../reducers/ChangePassword';

function ChangePasswordAPI(data: ChangePasswordTypes) {
  const config = {
    headers: {
      Authorization: sessionStorage.getItem('accessToken'),
    },
  };
  return axios.put(
    `${process.env.REACT_APP_BASIC_URL}/user/password`,
    data,
    config,
  );
}

function* fetchChangePasswordSaga(action: any): any {
  try {
    const result = yield call(ChangePasswordAPI, action.payload);
    yield put(ChangePasswordSuccess(result));
  } catch (error) {
    yield put(ChangePasswordFail(error));
  }
}

export default function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, fetchChangePasswordSaga);
}
