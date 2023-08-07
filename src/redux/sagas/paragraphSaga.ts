import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphRequestType } from 'types/request';
import { API_URL } from 'constants/path';
import {
  paragraphFail,
  paragraphInitFail,
  paragraphInitSuccess,
  paragraphSuccess,
  PARAGRAPH_INIT_REQUEST,
  PARAGRAPH_REQUEST,
} from 'redux/reducers/paragraphReducer';

export function paragraphAPI(params: ParagraphRequestType) {
  return instance.get(`${API_URL.PARAGRAPH}?bookId=${params.bookId}`);
}

function* fetchParagraphInitSaga(action: {
  type: string;
  payload: ParagraphRequestType;
}): object {
  try {
    const result = yield call(paragraphAPI, action.payload);
    yield put(paragraphInitSuccess(result.data.paragraphs));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(paragraphInitFail(error));
  }
}

function* fetchParagraphSaga(action: {
  type: string;
  payload: ParagraphRequestType;
}): object {
  try {
    const result = yield call(paragraphAPI, action.payload);
    yield put(paragraphSuccess(result.data.paragraphs));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(paragraphFail(error));
  }
}

export default function* watchParagraph() {
  yield takeEvery(PARAGRAPH_REQUEST, fetchParagraphSaga);
  yield takeEvery(PARAGRAPH_INIT_REQUEST, fetchParagraphInitSaga);
}
