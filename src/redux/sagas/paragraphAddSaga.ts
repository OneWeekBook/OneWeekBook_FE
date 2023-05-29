import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphAddRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  paragraphAddFail,
  paragraphAddSuccess,
  PARAGRAPH_ADD_REQUEST,
} from 'redux/reducers/paragraphReducer';

function paragraphAddAPI(data: ParagraphAddRequestTypes) {
  return instance.post(API_URL.PARAGRAPH, data);
}

function* fetchParagraphAddSaga(action: {
  type: string;
  payload: ParagraphAddRequestTypes;
}) {
  try {
    yield call(paragraphAddAPI, action.payload);
    yield put(paragraphAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(paragraphAddFail(error));
  }
}

export default function* watchParagraphAdd() {
  yield takeEvery(PARAGRAPH_ADD_REQUEST, fetchParagraphAddSaga);
}