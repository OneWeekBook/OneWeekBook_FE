import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  favoriteCancelFail,
  favoriteCancelSuccess,
  FAVORITE_CANCEL_REQUEST,
  favoriteSuccess,
  favoriteFail,
} from 'redux/reducers/favoriteReducer';
import {
  reviewFail,
  reviewSuccess,
  userReviewsInit,
} from 'redux/reducers/reviewReducer';
import { favoriteAPI } from './favoriteSaga';
import { reviewDetailAPI } from './reviewDetailSaga';

function favoriteCancelAPI(data: { userId: number; bookId: number }) {
  const { userId, bookId } = data;
  return instance.post(
    `${API_URL.BOOK_REVIEWS}/${bookId}${API_URL.LIKE_CANCEL}`,
    { userId },
  );
}

function* fetchFavoriteCancelSaga(action: {
  type: string;
  payload: { bookId: number; isbn: number; start: number; sortby: string };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(favoriteCancelAPI, { userId: user.id, ...action.payload });
    yield put(favoriteCancelSuccess());
    const favoriteResult = yield call(favoriteAPI, action.payload);
    yield put(favoriteSuccess(favoriteResult.data));
    yield put(userReviewsInit());
    const reivewResult = yield call(reviewDetailAPI, action.payload);
    yield put(reviewSuccess(reivewResult.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(favoriteCancelFail(error));
      yield put(favoriteFail(error));
      yield put(reviewFail(error));
    }
  }
}

export default function* watchFavoriteCancel() {
  yield takeEvery(FAVORITE_CANCEL_REQUEST, fetchFavoriteCancelSaga);
}
