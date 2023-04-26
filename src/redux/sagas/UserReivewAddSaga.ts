import axios from 'axios';
import instance from 'api/axios';
import { ReviewAddRequestTypes } from 'types/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  UserReviewAddFail,
  UserReviewAddSuccess,
  USER_REVIEW_ADD_REQUEST,
} from '../reducers/UserReview';

function UserReviewAddAPI(data: ReviewAddRequestTypes) {
  const { bookId, review, rating } = data;
  return instance.post(`/book/reviews/${bookId}`, { review, rating });
}

function* fetchUserReviewAddSaga(action: any) {
  try {
    yield call(UserReviewAddAPI, action.payload);
    yield put(UserReviewAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(UserReviewAddFail(error));
  }
}

export default function* watchUserReviewAdd() {
  yield takeEvery(USER_REVIEW_ADD_REQUEST, fetchUserReviewAddSaga);
}
