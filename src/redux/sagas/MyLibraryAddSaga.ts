import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { LibraryAddRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  MyLibraryAddFail,
  MyLibraryAddSuccess,
  MY_LIBRARY_ADD_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryAddAPI(data: { userId: number & LibraryAddRequestTypes }) {
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}${API_URL.LIBRARY}`,
    data,
  );
}

function* fetchMyLibraryAddSaga(action: {
  type: string;
  payload: LibraryAddRequestTypes;
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(MyLibraryAddAPI, { userId: user.id, ...action.payload });
    yield put(MyLibraryAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(MyLibraryAddFail(error));
  }
}

export default function* watchMyLibraryAdd() {
  yield takeEvery(MY_LIBRARY_ADD_REQUEST, fetchMyLibraryAddSaga);
}
