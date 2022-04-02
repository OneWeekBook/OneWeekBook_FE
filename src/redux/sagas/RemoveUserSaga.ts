import { instance } from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { RemoveUserTypes } from 'types/api';
import {
  RemoveUserFail,
  RemoveUserSuccess,
  REMOVE_USER_REQUEST,
} from '../reducers/RemoveUser';

function RemoveUserAPI(data: RemoveUserTypes) {
  return instance.get("/user");
}

function* fetchRemoveUserSaga(action: any): any {
  try {
    const result = yield call(RemoveUserAPI, action.payload);
    yield put(RemoveUserSuccess(result.data));
    sessionStorage.setItem('accessToken', result.data.accessToken);
  } catch (error) {
    yield put(RemoveUserFail(error));
  }
}

export default function* watchRemoveUser() {
  yield takeEvery(REMOVE_USER_REQUEST, fetchRemoveUserSaga);
}
