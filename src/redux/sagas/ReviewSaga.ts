import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ReviewTypes } from 'types/api';
import {
  ReviewsFail,
  ReviewsSuccess,
  REVIEWS_REQUEST,
} from '../reducers/Review';

function ReviewAPI(params: ReviewTypes) {
  const { start, sortby } = params;
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews?start=${start}&display=12&sortby=${sortby}`,
  );
}

function* fetchReviewSaga(action: any): any {
  try {
    const result = yield call(ReviewAPI, action.params);
    yield put(ReviewsSuccess(result.data.reviews));
  } catch (error) {
    yield put(ReviewsFail(error));
  }
}

export default function* watchReview() {
  yield takeEvery(REVIEWS_REQUEST, fetchReviewSaga);
}
