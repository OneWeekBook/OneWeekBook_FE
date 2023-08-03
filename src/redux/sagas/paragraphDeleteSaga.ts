import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphDeleteRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  paragraphDeleteFail,
  paragraphDeleteSuccess,
  PARAGRAPH_DELETE_REQUEST,
  paragraphSuccess,
  paragraphFail,
} from 'redux/reducers/paragraphReducer';
import { paragraphAPI } from './paragraphSaga';

function paragraphDeleteAPI(data: ParagraphDeleteRequestTypes) {
  return instance.delete(`${API_URL.PARAGRAPH}?id=${data.id}`);
}

function* fetchParagraphDeleteSaga(action: {
  type: string;
  payload: ParagraphDeleteRequestTypes;
}): object {
  try {
    yield call(paragraphDeleteAPI, action.payload);
    yield put(paragraphDeleteSuccess());
    const result = yield call(paragraphAPI, action.payload);
    yield put(paragraphSuccess(result.data.paragraphs));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(paragraphDeleteFail(error));
      yield put(paragraphFail(error));
    }
  }
}

export default function* watchParagraphDelete() {
  yield takeEvery(PARAGRAPH_DELETE_REQUEST, fetchParagraphDeleteSaga);
}
