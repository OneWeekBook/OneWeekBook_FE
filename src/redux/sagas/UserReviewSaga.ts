import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { UserReviewTypes } from 'types/api';
import {
  UserReviewFail,
  UserReviewSuccess,
  USER_REVIEW_REQUEST,
} from '../reducers/UserReview';

function UserReviewAPI(data: UserReviewTypes) {
  return instance.get(`/book/reviews/${data.bookId}/${data.userId}`);
}

function* fetchUserReviewSaga(action: any): any {
  try {
    const result = yield call(UserReviewAPI, action.payload);
    yield put(UserReviewSuccess(result.data.review));
  } catch (error) {
    yield put(UserReviewFail(error));
  }
}

export default function* watchUserReview() {
  yield takeEvery(USER_REVIEW_REQUEST, fetchUserReviewSaga);
}
