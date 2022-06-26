import { call, put, takeEvery } from 'redux-saga/effects';
import { LikeCancelTypes } from 'types/api';
import instance from 'api/axios';
import {
  LikeCancelFail,
  LikeCancelSuccess,
  LIKE_CANCEL_REQUEST,
} from '../reducers/Like';

function LikeCancelAPI(params: LikeCancelTypes) {
  const { bookId, userId } = params;
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${bookId}/like/cancel`,
    { userId },
  );
}

function* fetchLikeCancelSaga(action: any) {
  try {
    yield call(LikeCancelAPI, action.payload);
    yield put(LikeCancelSuccess());
  } catch (error) {
    yield put(LikeCancelFail(error));
  }
}

export default function* watchLikeCancel() {
  yield takeEvery(LIKE_CANCEL_REQUEST, fetchLikeCancelSaga);
}
