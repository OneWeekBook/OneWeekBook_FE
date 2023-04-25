import axios from 'axios';
import { call, put, throttle } from 'redux-saga/effects';
import { ReviewRequestTypes } from 'types/request';
import {
  ReviewsFail,
  ReviewsSuccess,
  REVIEWS_REQUEST,
} from '../reducers/Review';

function ReviewAPI(params: ReviewRequestTypes) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews?start=${params.start}&display=15&sortby=${params.sortby}`,
  );
}

function* fetchReviewSaga(action: any): any {
  try {
    const result = yield call(ReviewAPI, action.payload);
    yield put(ReviewsSuccess(result.data));
  } catch (error) {
    yield put(ReviewsFail(error));
  }
}

export default function* watchReview() {
  yield throttle(2000, REVIEWS_REQUEST, fetchReviewSaga);
}
