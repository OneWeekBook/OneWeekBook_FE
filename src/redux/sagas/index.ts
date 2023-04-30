import { all, call } from 'redux-saga/effects';
import watchAuthEmail from './AuthEmailSaga';
import watchAuthCode from './AuthCodeSaga';
import watchAuthUser from './AuthUserSaga';
import watchSignUp from './SignUpSaga';
import watchSignIn from './SignInSaga';
import watchCategory from './CategorySaga';
import watchSearch from './SearchSaga';
import watchChangeNick from './ChangeNickSaga';
import watchChangePassword from './ChangePasswordSaga';
import watchRemoveUser from './RemoveUserSaga';
import watchLibrary from './LibrarySaga';
import watchLibraryAdd from './LibraryAddSaga';
import watchLibraryModify from './LibraryModifySaga';
import watchLibraryDelete from './LibraryDeleteSaga';
import watchParagraph from './ParagraphSaga';
import watchParagraphAdd from './ParagraphAddSaga';
import watchParagraphDelete from './ParagraphDeleteSaga';
import watchReview from './ReviewSaga';
import watchReviewDetail from './ReviewDetailSaga';
import watchNewReview from './NewReviewSaga';
import watchUserReview from './UserReviewSaga';
import watchUserReviewAdd from './UserReivewAddSaga';
import watchUserReviewModify from './UserReviewModifySaga';
import watchUserReviewDelete from './UserReviewDeleteSaga';
import watchFavorite from './FavoriteSaga';
import watchFavoriteAdd from './FavoriteAddSaga';
import watchFavoriteCancel from './FavoriteCancelSaga';

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
