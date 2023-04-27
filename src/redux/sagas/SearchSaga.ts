import axios from 'axios';
import { call, put, throttle } from 'redux-saga/effects';
import { SearchRequestTypes } from 'types/request';
import { SearchFail, SearchSuccess, SEARCH_REQUEST } from '../reducers/Search';

function SearchAPI(params: SearchRequestTypes) {
  if (params.d_categ) {
    return axios.get(
      `${process.env.REACT_APP_BASIC_URL}/search?d_catg=${params.d_categ}&d_titl=${params.title}&start=${params.start}&display=${params.display}`,
    );
  }
  if (params.title) {
    return axios.get(
      `${process.env.REACT_APP_BASIC_URL}/search?query=${params.title}&start=${params.start}&diplay=${params.display}`,
    );
  }
}

function* fetchSearchSaga(action: {
  type: string;
  payload: SearchRequestTypes;
}): object {
  try {
    const result = yield call(SearchAPI, action.payload);
    yield put(SearchSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(SearchFail(error));
  }
}

export default function* watchSearch() {
  yield throttle(2000, SEARCH_REQUEST, fetchSearchSaga);
}
