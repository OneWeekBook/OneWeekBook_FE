import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  favoriteAddFail,
  favoriteAddSuccess,
  FAVORITE_ADD_REQUEST,
  favoriteFail,
  favoriteSuccess,
} from 'redux/reducers/favoriteReducer';
import {
  reviewFail,
  reviewSuccess,
  userReviewsInit,
} from 'redux/reducers/reviewReducer';
import { favoriteAPI } from './favoriteSaga';
import { reviewDetailAPI } from './reviewDetailSaga';

function favoriteAddAPI(params: {
  bookId: number;
  state: number;
  userId: number;
}) {
  const { bookId, state, userId } = params;
  return instance.post(`${API_URL.BOOK_REVIEWS}/${bookId}${API_URL.LIKE}`, {
    state,
    userId,
  });
}

function* fetchFavoiteAddSaga(action: {
  type: string;
  payload: {
    bookId: number;
    state: number;
    isbn: number;
    start: number;
    sortby: string;
  };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(favoriteAddAPI, { userId: user.id, ...action.payload });
    yield put(favoriteAddSuccess());
    const favoriteResult = yield call(favoriteAPI, action.payload);
    yield put(favoriteSuccess(favoriteResult.data));
    yield put(userReviewsInit());
    const reivewResult = yield call(reviewDetailAPI, action.payload);
    yield put(reviewSuccess(reivewResult.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(favoriteAddFail(error));
      yield put(favoriteFail(error));
      yield put(reviewFail(error));
    }
  }
}

export default function* watchFavoriteAdd() {
  yield takeEvery(FAVORITE_ADD_REQUEST, fetchFavoiteAddSaga);
}
