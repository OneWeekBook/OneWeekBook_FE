import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  FavoriteFail,
  FavoriteSuccess,
  FAVORITE_REQUEST,
} from 'redux/reducers/Favorite';

function FavoriteAPI(params: { bookId: number }) {
  return instance.get(`${API_URL.FAVORITE_USER}/${params.bookId}`);
}

function* fetchFavoriteSaga(action: {
  type: string;
  payload: { bookId: number };
}): object {
  try {
    const result = yield call(FavoriteAPI, action.payload);
    yield put(FavoriteSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(FavoriteFail(error));
  }
}

export default function* watchFavorite() {
  yield takeEvery(FAVORITE_REQUEST, fetchFavoriteSaga);
}
