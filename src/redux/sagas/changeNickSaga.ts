import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  changeNickFail,
  changeNickSuccess,
  CHANGE_NICK_REQUEST,
} from 'redux/reducers/changeNickReducer';

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
    yield put(changeNickSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(changeNickFail(error));
  }
}

export default function* watchChangeNick() {
  yield takeEvery(CHANGE_NICK_REQUEST, fetchChangeNickSaga);
}
