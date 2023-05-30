import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  favoriteFail,
  favoriteSuccess,
  FAVORITE_REQUEST,
} from 'redux/reducers/favoriteReducer';

function favoriteAPI(params: { bookId: number }) {
  return instance.get(`${API_URL.FAVORITE_USER}/${params.bookId}`);
}

function* fetchFavoriteSaga(action: {
  type: string;
  payload: { bookId: number };
}): object {
  try {
    const result = yield call(favoriteAPI, action.payload);
    yield put(favoriteSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(favoriteFail(error));
  }
}

export default function* watchFavorite() {
  yield takeEvery(FAVORITE_REQUEST, fetchFavoriteSaga);
}
