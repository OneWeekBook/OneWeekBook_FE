import instance from 'api/axios';
import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionUserReviewModify } from 'types/action';
import { ApiUserReview } from 'types/api';
import {
  UserReviewModifyFail,
  UserReviewModifySuccess,
  USER_REVIEW_MODIFY_REQUEST,
} from '../reducers/UserReview';

function UserReviewModifyAPI(data: ApiUserReview) {
  const { id, review, rating } = data;
  return instance.put(`/book/reviews/${id}`, { review, rating });
}

function* fetchUserReviewModifySaga(action: ActionUserReviewModify): object {
  try {
    const review = yield select((state) => state.userReview.reviewItem);
    yield call(UserReviewModifyAPI, { id: review.id, ...action.payload });
    yield put(UserReviewModifySuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(UserReviewModifyFail(error));
  }
}

export default function* watchUserReviewModify() {
  yield takeEvery(USER_REVIEW_MODIFY_REQUEST, fetchUserReviewModifySaga);
}
