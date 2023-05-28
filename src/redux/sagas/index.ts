import { all, call } from 'redux-saga/effects';
import watchAuthEmail from './authEmailSaga';
import watchAuthCode from './authCodeSaga';
import watchAuthUser from './authUserSaga';
import watchSignUp from './signUpSaga';
import watchSignIn from './signInSaga';
import watchCategory from './categorySaga';
import watchSearch from './searchSaga';
import watchChangeNick from './changeNickSaga';
import watchChangePassword from './changePasswordSaga';
import watchRemoveUser from './removeUserSaga';
import watchLibrary from './librarySaga';
import watchLibraryAdd from './libraryAddSaga';
import watchLibraryModify from './libraryModifySaga';
import watchLibraryDelete from './libraryDeleteSaga';
import watchParagraph from './paragraphSaga';
import watchParagraphAdd from './paragraphAddSaga';
import watchParagraphDelete from './paragraphDeleteSaga';
import watchReview from './reviewSaga';
import watchReviewDetail from './reviewDetailSaga';
import watchNewReview from './newReviewSaga';
import watchUserReview from './userReviewSaga';
import watchUserReviewAdd from './userReivewAddSaga';
import watchUserReviewModify from './userReviewModifySaga';
import watchUserReviewDelete from './userReviewDeleteSaga';
import watchFavorite from './favoriteSaga';
import watchFavoriteAdd from './favoriteAddSaga';
import watchFavoriteCancel from './favoriteCancelSaga';

export default function* rootSaga() {
  yield all([
    call(watchAuthEmail),
    call(watchAuthCode),
    call(watchAuthUser),
    call(watchSignUp),
    call(watchSignIn),
    call(watchCategory),
    call(watchSearch),
    call(watchChangeNick),
    call(watchChangePassword),
    call(watchRemoveUser),
    call(watchLibrary),
    call(watchLibraryAdd),
    call(watchLibraryModify),
    call(watchLibraryDelete),
    call(watchParagraph),
    call(watchParagraphAdd),
    call(watchParagraphDelete),
    call(watchReview),
    call(watchReviewDetail),
    call(watchNewReview),
    call(watchUserReview),
    call(watchUserReviewAdd),
    call(watchUserReviewModify),
    call(watchUserReviewDelete),
    call(watchFavorite),
    call(watchFavoriteAdd),
    call(watchFavoriteCancel),
  ]);
}
