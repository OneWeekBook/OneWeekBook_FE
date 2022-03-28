import { ChangePasswordTypes } from 'types/api';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

export const CHANGE_PASSWORD_INIT = 'CHANGE_PASSWORD_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  changeErrorStatus: null,
  changeErrorMsg: '',
};

export default function ChangePassword(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        changeErrorStatus: null,
        changeErrorMsg: '',
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        changeErrorStatus: 200,
        changeErrorMsg: '',
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        changeErrorStatus: action.error.status,
        changeErrorMsg: action.error.data.message,
      };
    case CHANGE_PASSWORD_INIT:
      return initialState;
    default:
      return state;
  }
}

export const ChangePasswordRequest = (data: ChangePasswordTypes) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: data,
  };
};

export const ChangePasswordSuccess = (data: any) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data,
  };
};

export const ChangePasswordFail = (error: any) => {
  return {
    type: CHANGE_PASSWORD_FAIL,
    error: error.response,
  };
};

export const ChangePasswordInit = () => {
  return {
    type: CHANGE_PASSWORD_INIT,
  };
};
