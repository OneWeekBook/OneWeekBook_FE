import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ApiSearch } from 'types/api';
import { ActionSearch } from 'types/action';
import {
  AddSearchFail,
  AddSearchSuccess,
  ADD_SEARCH_REQUEST,
} from '../reducers/Search';

function AddSearchAPI(params: ApiSearch) {
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

function* fetchAddSearchSaga(action: ActionSearch): object {
  try {
    const result = yield call(AddSearchAPI, action.payload);
    yield put(AddSearchSuccess(result.data));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(AddSearchFail(error));
  }
}

export default function* watchAddSearch() {
  yield takeEvery(ADD_SEARCH_REQUEST, fetchAddSearchSaga);
}
