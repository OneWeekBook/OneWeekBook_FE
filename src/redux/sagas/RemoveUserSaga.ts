import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  RemoveUserFail,
  RemoveUserSuccess,
  REMOVE_USER_REQUEST,
} from '../reducers/RemoveUser';

function RemoveUserAPI(data: { id: number; password: string }) {
  return instance.post('/user/resign', data);
}

function* fetchRemoveUserSaga(action: any): any {
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
