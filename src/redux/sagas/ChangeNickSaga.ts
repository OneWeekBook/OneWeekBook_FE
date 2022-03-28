import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ChangeNickTypes } from 'types/api';
import {
  ChangeNickFail,
  ChangeNickSuccess,
  CHANGE_NICK_REQUEST,
} from '../reducers/ChangeNick';

function ChangeNickAPI(data: ChangeNickTypes) {
  const config = {
    headers: {
      Authorization: sessionStorage.getItem('accessToken'),
    },
  };
  return axios.put(
    `${process.env.REACT_APP_BASIC_URL}/user/nick`,
    data,
    config,
  );
}

function* fetchChangeNickSaga(action: any): any {
  try {
    const result = yield call(ChangeNickAPI, action.payload);
    yield put(ChangeNickSuccess(result));
  } catch (error) {
    yield put(ChangeNickFail(error));
  }
}

export default function* watchChangeNick() {
  yield takeEvery(CHANGE_NICK_REQUEST, fetchChangeNickSaga);
}
