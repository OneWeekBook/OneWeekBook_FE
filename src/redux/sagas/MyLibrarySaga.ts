import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  MyLibraryFail,
  MyLibrarySuccess,
  MY_LIBRARY_REQUEST,
} from '../reducers/MyLibrary';

export function MyLibraryAPI(params: { userId: number; progress: number }) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/mylist?userId=${params.userId}&progress=${params.progress}`,
  );
}

export function* fetchMyLibrarySaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    const result = yield call(MyLibraryAPI, {
      userId: user.id,
      ...action.payload,
    });
    yield put(MyLibrarySuccess(result.data.myList));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(MyLibraryFail(error));
  }
}

export default function* watchMyLibrary() {
  yield takeEvery(MY_LIBRARY_REQUEST, fetchMyLibrarySaga);
}
