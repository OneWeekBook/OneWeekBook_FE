import { all, call } from 'redux-saga/effects';
import watchAuthEmail from './AuthEmailSaga';
import watchAuthCode from './AuthCodeSaga';
import watchSignUp from './SignUpSaga';
import watchSignIn from './SignInSaga';

export default function* rootSaga() {
  yield all([
    call(watchAuthEmail),
    call(watchAuthCode),
    call(watchSignUp),
    call(watchSignIn),
  ]);
}
