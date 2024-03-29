import axios from 'axios';
import instance from 'api/axios';
import { ReviewRequestTypes } from 'types/request';
import { call, put, throttle } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  reviewsFail,
  reviewsSuccess,
  REVIEWS_REQUEST,
} from 'redux/reducers/reviewReducer';

function reviewAPI(params: ReviewRequestTypes) {
  return instance.get(
    `${API_URL.BOOK_REVIEWS}?start=${params.start}&display=15&sortby=${params.sortby}`,
  );
}

function* fetchReviewSaga(action: {
  type: string;
  payload: ReviewRequestTypes;
}): object {
  try {
    const result = yield call(reviewAPI, action.payload);
    yield put(reviewsSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(reviewsFail(error));
  }
}

export default function* watchReview() {
  yield throttle(2000, REVIEWS_REQUEST, fetchReviewSaga);
}
