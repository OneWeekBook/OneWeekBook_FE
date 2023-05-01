import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  CategoryFail,
  CategorySuccess,
  CATEGORY_REQUEST,
} from 'redux/reducers/Category';

function CategoryAPI() {
  return instance.get(API_URL.CATEGORY);
}

function* fetchCategorySaga(): object {
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
