import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DeleteRequestType } from 'types/request';
import { API_URL } from 'constants/path';
import {
  ParagraphDeleteFail,
  ParagraphDeleteSuccess,
  PARAGRAPH_DELETE_REQUEST,
} from 'redux/reducers/Paragraph';

function ParagraphDeleteAPI(data: DeleteRequestType) {
  return instance.delete(
    `${process.env.REACT_APP_BASIC_URL}${API_URL.PARAGRAPH}?id=${data.id}`,
  );
}

function* fetchParagraphDeleteSaga(action: {
  type: string;
  payload: DeleteRequestType;
}) {
  try {
    yield call(ParagraphDeleteAPI, action.payload);
    yield put(ParagraphDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ParagraphDeleteFail(error));
  }
}

export default function* watchParagraphDelete() {
  yield takeEvery(PARAGRAPH_DELETE_REQUEST, fetchParagraphDeleteSaga);
}
