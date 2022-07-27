import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ChangePasswordFail,
  ChangePasswordSuccess,
  CHANGE_PASSWORD_REQUEST,
} from '../reducers/ChangePassword';

function ChangePasswordAPI(data: { email: string; password: string }) {
  return instance.put('/user/password', data);
}

function* fetchChangePasswordSaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(ChangePasswordAPI, { email: user.email, ...action.payload });
    yield put(ChangePasswordSuccess());
  } catch (error) {
    yield put(ChangePasswordFail(error));
  }
}

export default function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, fetchChangePasswordSaga);
}
