import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LikeFail, LikeSuccess, LIKE_REQUEST } from '../reducers/Like';

function LikeAPI(params: { bookId: number }) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/like/${params.bookId}`,
  );
}

function* fetchLikeSaga(action: any): any {
  try {
    const result = yield call(LikeAPI, action.payload);
    yield put(LikeSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LikeFail(error));
  }
}

export default function* watchLike() {
  yield takeEvery(LIKE_REQUEST, fetchLikeSaga);
}
