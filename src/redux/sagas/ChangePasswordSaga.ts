import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ChangePasswordTypes } from 'types/api';
import {
  ChangePasswordFail,
  ChangePasswordSuccess,
  CHANGE_PASSWORD_REQUEST,
} from '../reducers/ChangePassword';

function ChangePasswordAPI(data: ChangePasswordTypes) {
  return instance.put('/user/password', data);
}

function* fetchChangePasswordSaga(action: any): any {
  try {
    yield call(ChangePasswordAPI, action.payload);
    yield put(ChangePasswordSuccess());
  } catch (error) {
    yield put(ChangePasswordFail(error));
  }
}

export default function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, fetchChangePasswordSaga);
}
