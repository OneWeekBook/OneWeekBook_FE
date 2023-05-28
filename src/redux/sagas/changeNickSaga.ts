import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  ChangeNickFail,
  ChangeNickSuccess,
  CHANGE_NICK_REQUEST,
} from 'redux/reducers/ChangeNick';

function changeNickAPI(data: { nick: string; id: number }) {
  return instance.put(API_URL.USER_CHANGE_NICK, data);
}

function* fetchChangeNickSaga(action: {
  type: string;
  payload: { nick: string };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(changeNickAPI, { id: user.id, ...action.payload });
    yield put(ChangeNickSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ChangeNickFail(error));
  }
}

export default function* watchChangeNick() {
  yield takeEvery(CHANGE_NICK_REQUEST, fetchChangeNickSaga);
}
