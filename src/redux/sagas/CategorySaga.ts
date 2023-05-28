import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  categoryFail,
  categorySuccess,
  CATEGORY_REQUEST,
} from 'redux/reducers/categoryReducer';

function CategoryAPI() {
  return instance.get(API_URL.CATEGORY);
}

function* fetchCategorySaga(): object {
  try {
    const result = yield call(CategoryAPI);
    yield put(categorySuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(categoryFail(error));
  }
}

export default function* watchCategory() {
  yield takeEvery(CATEGORY_REQUEST, fetchCategorySaga);
}
