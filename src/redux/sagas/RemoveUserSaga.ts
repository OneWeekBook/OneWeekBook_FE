import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  RemoveUserFail,
  RemoveUserSuccess,
  REMOVE_USER_REQUEST,
} from '../reducers/RemoveUser';

function RemoveUserAPI(data: { id: number; password: string }) {
  return instance.post(API_URL.USER_DELETE, data);
}

function* fetchRemoveUserSaga(action: {
  type: string;
  payload: { password: string };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(RemoveUserAPI, { id: user.id, ...action.payload });
    yield put(RemoveUserSuccess());
    sessionStorage.removeItem('accessToken');
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(RemoveUserFail(error));
  }
}

export default function* watchRemoveUser() {
  yield takeEvery(REMOVE_USER_REQUEST, fetchRemoveUserSaga);
}
