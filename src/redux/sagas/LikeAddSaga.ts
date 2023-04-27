import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  LikeAddFail,
  LikeAddSuccess,
  LIKE_ADD_REQUEST,
} from '../reducers/Like';

function LikeAddAPI(params: { bookId: number; state: number; userId: number }) {
  const { bookId, state, userId } = params;
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${bookId}/like`,
    { state, userId },
  );
}

function* fetchLikeAddSaga(action: {
  type: string;
  payload: { bookId: number; state: number };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(LikeAddAPI, { userId: user.id, ...action.payload });
    yield put(LikeAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LikeAddFail(error));
  }
}

export default function* watchLikeAdd() {
  yield takeEvery(LIKE_ADD_REQUEST, fetchLikeAddSaga);
}
