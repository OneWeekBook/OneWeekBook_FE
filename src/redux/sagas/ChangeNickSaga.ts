import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ChangeNickFail,
  ChangeNickSuccess,
  CHANGE_NICK_REQUEST,
} from '../reducers/ChangeNick';

function ChangeNickAPI(data: { nick: string; id: number }) {
  return instance.put('/user/nick', data);
}

function* fetchChangeNickSaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(ChangeNickAPI, { id: user.id, ...action.payload });
    yield put(ChangeNickSuccess());
  } catch (error) {
    yield put(ChangeNickFail(error));
  }
}

export default function* watchChangeNick() {
  yield takeEvery(CHANGE_NICK_REQUEST, fetchChangeNickSaga);
}
