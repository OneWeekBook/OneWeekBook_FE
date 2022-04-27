import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { UserReviewModifyTypes } from 'types/api';
import {
  UserReviewModifyFail,
  UserReviewModifySuccess,
  USER_REVIEW_MODIFY_REQUEST,
} from '../reducers/UserReview';

function UserReviewModifyAPI(data: UserReviewModifyTypes) {
  const { id, review, rating } = data;
  return instance.put(`/book/reviews/${id}`, { review, rating });
}

function* fetchUserReviewModifySaga(action: any) {
  try {
    yield call(UserReviewModifyAPI, action.payload);
    yield put(UserReviewModifySuccess());
  } catch (error) {
    yield put(UserReviewModifyFail(error));
  }
}

export default function* watchUserReviewModify() {
  yield takeEvery(USER_REVIEW_MODIFY_REQUEST, fetchUserReviewModifySaga);
}
