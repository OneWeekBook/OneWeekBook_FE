import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CategoryFail,
  CategorySuccess,
  CATEGORY_REQUEST,
} from '../reducers/Category';

function CategoryAPI() {
  return axios.get(`${process.env.REACT_APP_BASIC_URL}/book/categories`);
}

function* fetchCategorySaga(): any {
  try {
    const result = yield call(CategoryAPI);
    yield put(CategorySuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(CategoryFail(error));
  }
}

export default function* watchCategory() {
  yield takeEvery(CATEGORY_REQUEST, fetchCategorySaga);
}
