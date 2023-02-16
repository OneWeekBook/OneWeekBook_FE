import instance from 'api/axios';
import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ApiDelete } from 'types/api';
import {
  UserReviewDeleteFail,
  UserReviewDeleteSuccess,
  USER_REVIEW_DELETE_REQUEST,
} from '../reducers/UserReview';

function UserReviewDeleteAPI(data: ApiDelete) {
  return instance.delete(`/book/reviews/${data.id}`);
}

function* fetchUserReviewDeleteSaga(): object {
  try {
    const review = yield select((state) => state.userReview.reviewItem);
    yield call(UserReviewDeleteAPI, { id: review.id });
    yield put(UserReviewDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(UserReviewDeleteFail(error));
  }
}

export default function* watchUserReviewDelete() {
  yield takeEvery(USER_REVIEW_DELETE_REQUEST, fetchUserReviewDeleteSaga);
}
