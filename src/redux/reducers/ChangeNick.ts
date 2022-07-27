import { ActionsTypes } from 'types/api';

export const CHANGE_NICK_REQUEST = 'CHANGE_NICK_REQUEST';
export const CHANGE_NICK_SUCCESS = 'CHANGE_NICK_SUCCESS';
export const CHANGE_NICK_FAIL = 'CHANGE_NICK_FAIL';

export const CHANGE_NICK_INIT = 'CHANGE_NICK_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  changeErrorStatus: null,
  changeErrorMsg: '',
};

export default function SignIn(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case CHANGE_NICK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        changeErrorStatus: null,
        changeErrorMsg: '',
      };
    case CHANGE_NICK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        changeErrorStatus: 200,
        changeErrorMsg: '',
      };
    case CHANGE_NICK_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        changeErrorStatus: action.error.status,
        changeErrorMsg: action.error.data.message,
      };
    case CHANGE_NICK_INIT:
      return initialState;
    default:
      return state;
  }
}

export const ChangeNickRequest = (data: { nick: string }) => {
  return {
    type: CHANGE_NICK_REQUEST,
    payload: data,
  };
};

export const ChangeNickSuccess = () => {
  return {
    type: CHANGE_NICK_SUCCESS,
  };
};

export const ChangeNickFail = (error: any) => {
  return {
    type: CHANGE_NICK_FAIL,
    error: error.response,
  };
};

export const ChangeNickInit = () => {
  return {
    type: CHANGE_NICK_INIT,
  };
};
