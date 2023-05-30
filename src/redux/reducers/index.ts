import { combineReducers } from 'redux';
import authEmail from './authEmailReducer';
import authCode from './authCodeReducer';
import authUser from './authUserReducer';
import signUp from './signUpReducer';
import signIn from './signInReducer';
import category from './categoryReducer';
import search from './searchReducer';
import changeNick from './changeNickReducer';
import changePassword from './changePasswordReducer';
import func from './funcReducer';
import removeUser from './removeUserReducer';
import library from './libraryReducer';
import paragraph from './paragraphReducer';
import review from './reviewReducer';
import newReview from './newReviewReducer';
import userReview from './userReviewReducer';
import favorite from './favoriteReducer';

const rootReducer = combineReducers({
  authEmail,
  authCode,
  authUser,
  signUp,
  signIn,
  category,
  search,
  changeNick,
  changePassword,
  func,
  removeUser,
  library,
  paragraph,
  review,
  newReview,
  userReview,
  favorite,
});

export default rootReducer;

export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
