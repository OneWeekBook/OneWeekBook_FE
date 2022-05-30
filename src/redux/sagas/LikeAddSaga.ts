import { call, put, takeEvery } from 'redux-saga/effects';
import { LikeTypes } from 'types/api';
import instance from 'api/axios';
import {
  LikeAddFail,
  LikeAddSuccess,
  LIKE_ADD_REQUEST,
} from '../reducers/Like';

function LikeAddAPI(params: LikeTypes) {
  const { bookId, state, userId } = params;
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${bookId}/like`,
    { state, userId },
  );
}

function* fetchLikeAddSaga(action: any) {
  try {
    yield call(LikeAddAPI, action.payload);
    yield put(LikeAddSuccess());
  } catch (error) {
    yield put(LikeAddFail(error));
  }
}

export default function* watchLikeAdd() {
  yield takeEvery(LIKE_ADD_REQUEST, fetchLikeAddSaga);
}
