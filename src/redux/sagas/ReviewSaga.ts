import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionReview } from 'types/action';
import { ApiReview } from 'types/api';
import {
  ReviewsFail,
  ReviewsSuccess,
  REVIEWS_REQUEST,
} from '../reducers/Review';

function ReviewAPI(params: ApiReview) {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}/book/reviews?start=${params.start}&display=12&sortby=${params.sortby}`,
  );
}

function* fetchReviewSaga(action: ActionReview): object {
  try {
    const result = yield call(ReviewAPI, action.payload);
    yield put(ReviewsSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ReviewsFail(error));
  }
}

export default function* watchReview() {
  yield takeEvery(REVIEWS_REQUEST, fetchReviewSaga);
}
