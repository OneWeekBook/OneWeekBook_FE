import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  FavoriteAddFail,
  FavoriteAddSuccess,
  FAVORITE_ADD_REQUEST,
} from 'redux/reducers/Favorite';

function FavoriteAddAPI(params: {
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
  payload: { bookId: number; state: number };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(FavoriteAddAPI, { userId: user.id, ...action.payload });
    yield put(FavoriteAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(FavoriteAddFail(error));
  }
}

export default function* watchFavoriteAdd() {
  yield takeEvery(FAVORITE_ADD_REQUEST, fetchFavoiteAddSaga);
}
