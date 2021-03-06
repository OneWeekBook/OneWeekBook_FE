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
import watchMyLibraryDelete from './MyLibraryDeleteSaga';
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
import watchLike from './LikeSaga';
import watchLikeAdd from './LikeAddSaga';
import watchLikeCancel from './LikeCancelSaga';

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
    call(watchMyLibraryDelete),
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
    call(watchLike),
    call(watchLikeAdd),
    call(watchLikeCancel),
  ]);
}
