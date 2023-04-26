import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  UserReviewModifyFail,
  UserReviewModifySuccess,
  USER_REVIEW_MODIFY_REQUEST,
} from '../reducers/UserReview';

function UserReviewModifyAPI(data: {
  id: number;
  review: string;
  rating: number;
}) {
  const { id, review, rating } = data;
  return instance.put(`/book/reviews/${id}`, { review, rating });
}

function* fetchUserReviewModifySaga(action: any): any {
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
