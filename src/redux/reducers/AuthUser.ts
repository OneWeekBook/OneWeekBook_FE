import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';

export const AUTH_USER_INIT = 'AUTH_USER_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  user: {},
  userBooks: [],
};

export default function AuthEmail(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload.userData,
        userBooks: action.payload.bookData,
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case AUTH_USER_INIT:
      return initialState;
    default:
      return state;
  }
}

export const AuthUserRequest = () => {
  return {
    type: AUTH_USER_REQUEST,
  };
};

export const AuthUserSuccess = (data: any) => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: data,
  };
};

export const AuthUserFail = (error: AxiosError) => {
  return {
    type: AUTH_USER_FAIL,
    error: error.response,
  };
};

export const AuthInit = () => {
  return {
    type: AUTH_USER_INIT,
  };
};
