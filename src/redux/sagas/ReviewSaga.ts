import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ReviewTypes } from 'types/api';
import {
  ReviewsFail,
  ReviewsSuccess,
  REVIEWS_REQUEST,
} from '../reducers/Review';

function ReviewAPI(params: ReviewTypes) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews?start=${params.start}&display=12&sortby=${params.sortby}`,
  );
}

function* fetchReviewSaga(action: any): any {
  try {
    const result = yield call(ReviewAPI, action.params);
    yield put(ReviewsSuccess(result.data));
  } catch (error) {
    yield put(ReviewsFail(error));
  }
}

export default function* watchReview() {
  yield takeEvery(REVIEWS_REQUEST, fetchReviewSaga);
}
