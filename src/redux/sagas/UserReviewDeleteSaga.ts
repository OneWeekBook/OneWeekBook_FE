import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DeleteType } from 'types/api';
import {
  UserReviewDeleteFail,
  UserReviewDeleteSuccess,
  USER_REVIEW_DELETE_REQUEST,
} from '../reducers/UserReview';

function UserReviewDeleteAPI(data: DeleteType) {
  return instance.delete(`/book/reviews/${data.id}`);
}

function* fetchUserReviewDeleteSaga(action: any) {
  try {
    yield call(UserReviewDeleteAPI, action.payload);
    yield put(UserReviewDeleteSuccess());
  } catch (error) {
    yield put(UserReviewDeleteFail(error));
  }
}

export default function* watchUserReviewDelete() {
  yield takeEvery(USER_REVIEW_DELETE_REQUEST, fetchUserReviewDeleteSaga);
}
