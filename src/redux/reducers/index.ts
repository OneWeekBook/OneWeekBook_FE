import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';
import authUser from './AuthUser';
import signUp from './SignUp';
import signIn from './SignIn';
import category from './Category';
import search from './Search';
import changeNick from './ChangeNick';
import changePassword from './ChangePassword';
import func from './Func';
import removeUser from './RemoveUser';
import library from './Library';
import paragraph from './Paragraph';
import review from './Review';
import newReview from './NewReview';
import userReview from './UserReview';
import favorite from './Favorite';

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
