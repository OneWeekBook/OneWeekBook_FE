import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SearchFail, SearchSuccess, SEARCH_REQUEST } from '../reducers/Search';

function SearchAPI(params: any) {
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

function* fetchSearchSaga(action: any): any {
  try {
    const result = yield call(SearchAPI, action.params);
    yield put(SearchSuccess(result.data));
  } catch (error) {
    yield put(SearchFail(error));
  }
}

export default function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, fetchSearchSaga);
}
