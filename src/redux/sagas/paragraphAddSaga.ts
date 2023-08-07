import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphAddRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  paragraphAddFail,
  paragraphAddSuccess,
  PARAGRAPH_ADD_REQUEST,
  paragraphSuccess,
  paragraphFail,
} from 'redux/reducers/paragraphReducer';
import { paragraphAPI } from './paragraphSaga';

function paragraphAddAPI(data: ParagraphAddRequestTypes) {
  return instance.post(API_URL.PARAGRAPH, data);
}

function* fetchParagraphAddSaga(action: {
  type: string;
  payload: ParagraphAddRequestTypes;
}): object {
  try {
    yield call(paragraphAddAPI, action.payload);
    yield put(paragraphAddSuccess());
    const result = yield call(paragraphAPI, action.payload);
    yield put(paragraphSuccess(result.data.paragraphs));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(paragraphAddFail(error));
      yield put(paragraphFail(error));
    }
  }
}

export default function* watchParagraphAdd() {
  yield takeEvery(PARAGRAPH_ADD_REQUEST, fetchParagraphAddSaga);
}
