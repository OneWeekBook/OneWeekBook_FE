import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionReviewDetail } from 'types/action';
import { ApiReivewDetail } from 'types/api';
import { ReviewFail, ReviewSuccess, REVIEW_REQUEST } from '../reducers/Review';

function ReviewDetailAPI(params: ApiReivewDetail) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews/${params.isbn}?start=${params.start}&display=10&sortby=${params.sortby}`,
  );
}

function* fetchReviewDetailSaga(action: ActionReviewDetail): object {
  try {
    const result = yield call(ReviewDetailAPI, action.payload);
    yield put(ReviewSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ReviewFail(error));
  }
}

export default function* watchReviewDetail() {
  yield takeEvery(REVIEW_REQUEST, fetchReviewDetailSaga);
}
