import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  NewReviewsFail,
  NewReviewsSuccess,
  NEW_REVIEWS_REQUEST,
} from '../reducers/NewReview';

function NewReviewAPI() {
  return axios.get(
    `${process.env.REACT_APP_BASIC_URL}${API_URL.LATEST_REVIEW}`,
  );
}

function* fetchNewReviewSaga(): any {
  try {
    const result = yield call(NewReviewAPI);
    yield put(NewReviewsSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(NewReviewsFail(error));
  }
}

export default function* watchNewReview() {
  yield takeEvery(NEW_REVIEWS_REQUEST, fetchNewReviewSaga);
}
