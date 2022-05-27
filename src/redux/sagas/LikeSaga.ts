import { call, put, takeEvery } from 'redux-saga/effects';
import { LikeTypes } from 'types/api';
import instance from 'api/axios';
import { LikeFail, LikeSuccess, LIKE_REQUEST } from '../reducers/Like';

function LikeAPI(params: LikeTypes) {
  const { bookId, state, userId } = params;
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${bookId}/like`,
    { state, userId },
  );
}

function* fetchLikeSaga(action: any) {
  try {
    yield call(LikeAPI, action.payload);
    yield put(LikeSuccess());
  } catch (error) {
    yield put(LikeFail(error));
  }
}

export default function* watchLike() {
  yield takeEvery(LIKE_REQUEST, fetchLikeSaga);
}
