import axios from 'axios';
import instance from 'api/axios';
import { call, put, throttle } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import { SearchRequestTypes } from 'types/request';
import {
  searchFail,
  searchSuccess,
  SEARCH_REQUEST,
} from 'redux/reducers/searchReducer';

function SearchAPI(params: SearchRequestTypes) {
  if (params.d_categ) {
    return instance.get(
      `${API_URL.SEARCH}?d_catg=${params.d_categ}&d_titl=${params.title}&start=${params.start}&display=${params.display}`,
    );
  }
  if (params.title) {
    return instance.get(
      `${process.env.REACT_APP_BASIC_URL}${API_URL.SEARCH}?query=${params.title}&start=${params.start}&diplay=${params.display}`,
    );
  }
}

function* fetchSearchSaga(action: {
  type: string;
  payload: SearchRequestTypes;
}): object {
  try {
    const result = yield call(SearchAPI, action.payload);
    yield put(searchSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(searchFail(error));
  }
}

export default function* watchSearch() {
  yield throttle(2000, SEARCH_REQUEST, fetchSearchSaga);
}
