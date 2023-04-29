import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphAddRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  ParagraphAddFail,
  ParagraphAddSuccess,
  PARAGRAPH_ADD_REQUEST,
} from 'redux/reducers/Paragraph';

function ParagraphAddAPI(data: ParagraphAddRequestTypes) {
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}${API_URL.PARAGRAPH}`,
    data,
  );
}

function* fetchParagraphAddSaga(action: {
  type: string;
  payload: ParagraphAddRequestTypes;
}) {
  try {
    yield call(ParagraphAddAPI, action.payload);
    yield put(ParagraphAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ParagraphAddFail(error));
  }
}

export default function* watchParagraphAdd() {
  yield takeEvery(PARAGRAPH_ADD_REQUEST, fetchParagraphAddSaga);
}
