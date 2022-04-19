import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ChangeNickTypes } from 'types/api';
import {
  ChangeNickFail,
  ChangeNickSuccess,
  CHANGE_NICK_REQUEST,
} from '../reducers/ChangeNick';

function ChangeNickAPI(data: ChangeNickTypes) {
  return instance.get('/user');
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
