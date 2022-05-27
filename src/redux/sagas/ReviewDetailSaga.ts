import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ReivewDetailTypes } from 'types/api';
import { ReviewFail, ReviewSuccess, REVIEW_REQUEST } from '../reducers/Review';

function ReviewDetailAPI(params: ReivewDetailTypes) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${params.isbn}?sortby=${params.sortby}`,
  );
}

function* fetchReviewDetailSaga(action: any): any {
  try {
    const result = yield call(ReviewDetailAPI, action.data);
    yield put(ReviewSuccess(result.data));
  } catch (error) {
    yield put(ReviewFail(error));
  }
}

export default function* watchReviewDetail() {
  yield takeEvery(REVIEW_REQUEST, fetchReviewDetailSaga);
}
