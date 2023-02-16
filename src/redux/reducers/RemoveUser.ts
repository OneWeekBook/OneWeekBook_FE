import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/api';

export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
export const REMOVE_USER_FAIL = 'REMOVE_USER_FAIL';

export const REMOVE_USER_INIT = 'REMOVE_USER_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  removeErrorStatus: null,
  removeErrorMsg: '',
};

export default function RemoveError(
  state = initialState,
  action: ActionsTypes,
) {
  switch (action.type) {
    case REMOVE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        removeErrorStatus: null,
        removeErrorMsg: '',
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        removeErrorStatus: 200,
        removeErrorMsg: '',
      };
    case REMOVE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        removeErrorStatus: action.error.status,
        removeErrorMsg: action.error.data.message,
      };
    case REMOVE_USER_INIT:
      return initialState;
    default:
      return state;
  }
}

export const RemoveUserRequest = (data: { password: string }) => {
  return {
    type: REMOVE_USER_REQUEST,
    payload: data,
  };
};

export const RemoveUserSuccess = () => {
  return {
    type: REMOVE_USER_SUCCESS,
  };
};

export const RemoveUserFail = (error: AxiosError) => {
  return {
    type: REMOVE_USER_FAIL,
    error: error.response,
  };
};

export const RemoveUserInit = () => {
  return {
    type: REMOVE_USER_INIT,
  };
};
