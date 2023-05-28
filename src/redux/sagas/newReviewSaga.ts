import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  newReviewsFail,
  newReviewsSuccess,
  NEW_REVIEWS_REQUEST,
} from 'redux/reducers/newReviewReducer';

function newReviewAPI() {
  return instance.get(API_URL.LATEST_REVIEW);
}

function* fetchNewReviewSaga(): any {
  try {
    const result = yield call(newReviewAPI);
    yield put(newReviewsSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(newReviewsFail(error));
  }
}

export default function* watchNewReview() {
  yield takeEvery(NEW_REVIEWS_REQUEST, fetchNewReviewSaga);
}
