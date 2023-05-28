import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  UserReviewFail,
  UserReviewSuccess,
  USER_REVIEW_REQUEST,
} from 'redux/reducers/UserReview';

function userReviewAPI(data: { userId: number; bookId: number }) {
  return instance.get(`${API_URL.BOOK_REVIEWS}/${data.bookId}/${data.userId}`);
}

function* fetchUserReviewSaga(action: {
  type: string;
  payload: { bookId: number };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    const result = yield call(userReviewAPI, {
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
