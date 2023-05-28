import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  FavoriteCancelFail,
  FavoriteCancelSuccess,
  FAVORITE_CANCEL_REQUEST,
} from 'redux/reducers/Favorite';

function favoriteCancelAPI(data: { userId: number; bookId: number }) {
  const { userId, bookId } = data;
  return instance.post(
    `${API_URL.BOOK_REVIEWS}/${bookId}${API_URL.LIKE_CANCEL}`,
    { userId },
  );
}

function* fetchFavoriteCancelSaga(action: {
  type: string;
  payload: { bookId: number };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(favoriteCancelAPI, { userId: user.id, ...action.payload });
    yield put(FavoriteCancelSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(FavoriteCancelFail(error));
  }
}

export default function* watchFavoriteCancel() {
  yield takeEvery(FAVORITE_CANCEL_REQUEST, fetchFavoriteCancelSaga);
}
