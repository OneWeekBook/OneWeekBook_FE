import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ReviewFail, ReviewSuccess, REVIEW_REQUEST } from '../reducers/Review';

function ReviewDetailAPI(params: { isbn: number }) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${params.isbn}`,
  );
}

function* fetchReviewDetailSaga(action: any): any {
  try {
    const result = yield call(ReviewDetailAPI, action.data);
    yield put(ReviewSuccess(result.data.results));
  } catch (error) {
    yield put(ReviewFail(error));
  }
}

export default function* watchReviewDetail() {
  yield takeEvery(REVIEW_REQUEST, fetchReviewDetailSaga);
}
