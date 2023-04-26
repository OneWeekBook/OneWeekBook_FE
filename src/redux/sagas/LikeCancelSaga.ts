import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  LikeCancelFail,
  LikeCancelSuccess,
  LIKE_CANCEL_REQUEST,
} from '../reducers/Like';

function LikeCancelAPI(data: { userId: number; bookId: number }) {
  const { userId, bookId } = data;
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${bookId}/like/cancel`,
    { userId },
  );
}

function* fetchLikeCancelSaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(LikeCancelAPI, { userId: user.id, ...action.payload });
    yield put(LikeCancelSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LikeCancelFail(error));
  }
}

export default function* watchLikeCancel() {
  yield takeEvery(LIKE_CANCEL_REQUEST, fetchLikeCancelSaga);
}
