import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  changePasswordFail,
  changePasswordSuccess,
  CHANGE_PASSWORD_REQUEST,
} from 'redux/reducers/changePasswordReducer';

function ChangePasswordAPI(data: { email: string; password: string }) {
  return instance.put(API_URL.USER_CHANGE_PASSWORD, data);
}

function* fetchChangePasswordSaga(action: {
  type: string;
  payload: { password: string };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(ChangePasswordAPI, { email: user.email, ...action.payload });
    yield put(changePasswordSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(changePasswordFail(error));
  }
}

export default function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, fetchChangePasswordSaga);
}
