import axios from 'axios';
import instance from 'api/axios';
import { ReviewRequestTypes } from 'types/request';
import { call, put, throttle } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  ReviewsFail,
  ReviewsSuccess,
  REVIEWS_REQUEST,
} from 'redux/reducers/Review';

function ReviewAPI(params: ReviewRequestTypes) {
  return instance.get(
    `${API_URL.BOOK_REVIEWS}?start=${params.start}&display=15&sortby=${params.sortby}`,
  );
}

function* fetchReviewSaga(action: {
  type: string;
  payload: ReviewRequestTypes;
}): object {
  try {
    const result = yield call(ReviewAPI, action.payload);
    yield put(ReviewsSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ReviewsFail(error));
  }
}

export default function* watchReview() {
  yield throttle(2000, REVIEWS_REQUEST, fetchReviewSaga);
}
