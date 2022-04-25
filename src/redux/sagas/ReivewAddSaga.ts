import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ReviewAddTypes } from 'types/api';
import {
  ReviewAddFail,
  ReviewAddSuccess,
  REVIEW_ADD_REQUEST,
} from '../reducers/Reivew';

function ReviewAddAPI(data: ReviewAddTypes) {
  const { bookId, review, rating } = data;
  return instance.post(`/book/reviews/${bookId}`, { review, rating });
}

function* fetchReviewAddSaga(action: any) {
  try {
    yield call(ReviewAddAPI, action.payload);
    yield put(ReviewAddSuccess());
  } catch (error) {
    yield put(ReviewAddFail(error));
  }
}

export default function* watchReviewAdd() {
  yield takeEvery(REVIEW_ADD_REQUEST, fetchReviewAddSaga);
}
