import axios from 'axios';
import { BookRequestTypes } from 'types/request';
import { call, put, throttle } from 'redux-saga/effects';
import { ReviewFail, ReviewSuccess, REVIEW_REQUEST } from '../reducers/Review';

function ReviewDetailAPI(params: BookRequestTypes) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${params.isbn}?start=${params.start}&display=10&sortby=${params.sortby}`,
  );
}

function* fetchReviewDetailSaga(action: any): any {
  try {
    const result = yield call(ReviewDetailAPI, action.payload);
    yield put(ReviewSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ReviewFail(error));
  }
}

export default function* watchReviewDetail() {
  yield throttle(2000, REVIEW_REQUEST, fetchReviewDetailSaga);
}
