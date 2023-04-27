import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  UserReviewFail,
  UserReviewSuccess,
  USER_REVIEW_REQUEST,
} from '../reducers/UserReview';

function UserReviewAPI(data: { userId: number; bookId: number }) {
  return instance.get(`/book/reviews/${data.bookId}/${data.userId}`);
}

function* fetchUserReviewSaga(action: {
  type: string;
  payload: { bookId: number };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    const result = yield call(UserReviewAPI, {
      userId: user.id,
      ...action.payload,
    });
    yield put(UserReviewSuccess(result.data.review));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(UserReviewFail(error));
  }
}

export default function* watchUserReview() {
  yield takeEvery(USER_REVIEW_REQUEST, fetchUserReviewSaga);
}
