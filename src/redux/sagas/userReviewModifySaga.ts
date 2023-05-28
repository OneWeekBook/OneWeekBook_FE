import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  UserReviewModifyFail,
  UserReviewModifySuccess,
  USER_REVIEW_MODIFY_REQUEST,
} from 'redux/reducers/UserReview';

function userReviewModifyAPI(data: {
  id: number;
  review: string;
  rating: number;
}) {
  const { id, review, rating } = data;
  return instance.put(`${API_URL.BOOK_REVIEWS}/${id}`, { review, rating });
}

function* fetchUserReviewModifySaga(action: {
  type: string;
  payload: { review: string; rating: number };
}): object {
  try {
    const review = yield select((state) => state.userReview.reviewItem);
    yield call(userReviewModifyAPI, { id: review.id, ...action.payload });
    yield put(UserReviewModifySuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(UserReviewModifyFail(error));
  }
}

export default function* watchUserReviewModify() {
  yield takeEvery(USER_REVIEW_MODIFY_REQUEST, fetchUserReviewModifySaga);
}
