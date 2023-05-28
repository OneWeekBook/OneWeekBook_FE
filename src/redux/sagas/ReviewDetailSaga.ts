import axios from 'axios';
import instance from 'api/axios';
import { BookRequestTypes } from 'types/request';
import { call, put, throttle } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  reviewFail,
  reviewSuccess,
  REVIEW_REQUEST,
} from 'redux/reducers/reviewReducer';

function ReviewDetailAPI(params: BookRequestTypes) {
  return instance.get(
    `${API_URL.BOOK_REVIEWS}/${params.isbn}?start=${params.start}&display=10&sortby=${params.sortby}`,
  );
}

function* fetchReviewDetailSaga(action: {
  type: string;
  payload: BookRequestTypes;
}): object {
  try {
    const result = yield call(ReviewDetailAPI, action.payload);
    yield put(reviewSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(reviewFail(error));
  }
}

export default function* watchReviewDetail() {
  yield throttle(2000, REVIEW_REQUEST, fetchReviewDetailSaga);
}
