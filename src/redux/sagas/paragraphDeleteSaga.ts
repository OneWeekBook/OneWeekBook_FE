import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DeleteRequestType } from 'types/request';
import { API_URL } from 'constants/path';
import {
  paragraphDeleteFail,
  paragraphDeleteSuccess,
  PARAGRAPH_DELETE_REQUEST,
} from 'redux/reducers/paragraphReducer';

function paragraphDeleteAPI(data: DeleteRequestType) {
  return instance.delete(`${API_URL.PARAGRAPH}?id=${data.id}`);
}

function* fetchParagraphDeleteSaga(action: {
  type: string;
  payload: DeleteRequestType;
}) {
  try {
    yield call(paragraphDeleteAPI, action.payload);
    yield put(paragraphDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(paragraphDeleteFail(error));
  }
}

export default function* watchParagraphDelete() {
  yield takeEvery(PARAGRAPH_DELETE_REQUEST, fetchParagraphDeleteSaga);
}
