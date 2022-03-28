import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { RemoveUserTypes } from 'types/api';
import {
  RemoveUserFail,
  RemoveUserSuccess,
  REMOVE_USER_REQUEST,
} from '../reducers/RemoveUser';

function RemoveUserAPI(data: RemoveUserTypes) {
  const config = {
    headers: {
      Authorization: sessionStorage.getItem('accessToken'),
    },
  };
  return axios.post(
    `${process.env.REACT_APP_BASIC_URL}/user/resign`,
    data,
    config,
  );
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
