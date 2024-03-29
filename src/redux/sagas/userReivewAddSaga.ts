import axios from 'axios';
import instance from 'api/axios';
import { ReviewAddRequestTypes } from 'types/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  userReviewAddFail,
  userReviewAddSuccess,
  USER_REVIEW_ADD_REQUEST,
} from 'redux/reducers/userReviewReducer';

function userReviewAddAPI(data: ReviewAddRequestTypes) {
  const { bookId, review, rating } = data;
  return instance.post(`${API_URL.BOOK_REVIEWS}/${bookId}`, { review, rating });
}

function* fetchUserReviewAddSaga(action: {
  type: string;
  payload: ReviewAddRequestTypes;
}) {
  try {
    yield call(userReviewAddAPI, action.payload);
    yield put(userReviewAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(userReviewAddFail(error));
  }
}

export default function* watchUserReviewAdd() {
  yield takeEvery(USER_REVIEW_ADD_REQUEST, fetchUserReviewAddSaga);
}
