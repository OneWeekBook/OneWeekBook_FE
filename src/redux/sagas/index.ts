import { all, call } from 'redux-saga/effects';
import watchAuthEmail from './AuthEmailSaga';
import watchAuthCode from './AuthCodeSaga';
import watchAuthUser from './AuthUserSaga';
import watchSignUp from './SignUpSaga';
import watchSignIn from './SignInSaga';
import watchCategory from './CategorySaga';
import watchSearch from './SearchSaga';
import watchAddSearch from './AddSearchSaga';
import watchChangeNick from './ChangeNickSaga';
import watchChangePassword from './ChangePasswordSaga';
import watchRemoveUser from './RemoveUserSaga';
import watchMyLibrary from './MyLibrarySaga';
import watchMyLibraryAdd from './MyLibraryAddSaga';
import watchMyLibraryModify from './MyLibraryModifySaga';
import watchParagraph from './ParagraphSaga';
import watchParagraphAdd from './ParagraphAddSaga';
import watchParagraphDelete from './ParagraphDeleteSaga';
import watchReviewAdd from './ReivewAddSaga';

export default function* rootSaga() {
  yield all([
    call(watchAuthEmail),
    call(watchAuthCode),
    call(watchAuthUser),
    call(watchSignUp),
    call(watchSignIn),
    call(watchCategory),
    call(watchSearch),
    call(watchAddSearch),
    call(watchChangeNick),
    call(watchChangePassword),
    call(watchRemoveUser),
    call(watchMyLibrary),
    call(watchMyLibraryAdd),
    call(watchMyLibraryModify),
    call(watchParagraph),
    call(watchParagraphAdd),
    call(watchParagraphDelete),
    call(watchReviewAdd),
  ]);
}
