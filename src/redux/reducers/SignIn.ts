import { SignInRequestTypes, ActionsTypes } from 'types/request';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

export const SIGN_IN_INIT = 'SIGN_IN_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  signInErrorStatus: null,
  signInErrorMsg: '',
};

export default function SignIn(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        signInErrorStatus: null,
        signInErrorMsg: '',
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        signInErrorStatus: 200,
        signInErrorMsg: '',
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        signInErrorStatus: action.error.status,
        signInErrorMsg: action.error.data.message,
      };
    case SIGN_IN_INIT:
      return initialState;
    default:
      return state;
  }
}

export const SignInRequest = (data: SignInRequestTypes) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: data,
  };
};

export const SignInSuccess = (data: any) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
};

export const SignInFail = (error: any) => {
  return {
    type: SIGN_IN_FAIL,
    error: error.response,
  };
};

export const SignInInit = () => {
  return {
    type: SIGN_IN_INIT,
  };
};
