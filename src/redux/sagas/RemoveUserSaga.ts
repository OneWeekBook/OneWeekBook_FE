import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { RemoveUserTypes } from 'types/api';
import {
  RemoveUserFail,
  RemoveUserSuccess,
  REMOVE_USER_REQUEST,
} from '../reducers/RemoveUser';

function RemoveUserAPI(data: RemoveUserTypes) {
  return instance.post('/user/resign', data);
}

function* fetchRemoveUserSaga(action: any): any {
  try {
    yield call(RemoveUserAPI, action.payload);
    yield put(RemoveUserSuccess());
    sessionStorage.removeItem('accessToken');
  } catch (error) {
    yield put(RemoveUserFail(error));
  }
}

export default function* watchRemoveUser() {
  yield takeEvery(REMOVE_USER_REQUEST, fetchRemoveUserSaga);
}
