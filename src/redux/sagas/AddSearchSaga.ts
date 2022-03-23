import { call, put, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
  AddSearchFail,
  AddSearchSuccess,
  ADD_SEARCH_REQUEST,
} from '../reducers/Search';

function AddSearchAPI(params: any) {
  console.log(params);
  if (params.d_categ) {
    return axios.get(
      `${process.env.REACT_APP_BASIC_URL}/book/search?d_catg=${params.d_categ}&d_titl=${params.title}&start=${params.start}&display=${params.display}`,
    );
  }
  if (params.title) {
    return axios.get(
      `${process.env.REACT_APP_BASIC_URL}/book/search?query=${params.title}&start=${params.start}&diplay=${params.display}`,
    );
  }
}

function* fetchAddSearchSaga(action: any): any {
  try {
    const result = yield call(AddSearchAPI, action.params);
    yield put(AddSearchSuccess(result.data));
  } catch (error) {
    yield put(AddSearchFail(error));
  }
}

export default function* watchAddSearch() {
  yield throttle(5000, ADD_SEARCH_REQUEST, fetchAddSearchSaga);
}
