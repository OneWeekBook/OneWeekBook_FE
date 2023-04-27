import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';
import { ResponseFavoriteSuccess } from 'types/response';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAIL = 'LIKE_FAIL';

export const LIKE_ADD_REQUEST = 'LIKE_ADD_REQUEST';
export const LIKE_ADD_SUCCESS = 'LIKE_ADD_SUCCESS';
export const LIKE_ADD_FAIL = 'LIKE_ADD_FAIL';

export const LIKE_CANCEL_REQUEST = 'LIKE_CANCEL_REQUEST';
export const LIKE_CANCEL_SUCCESS = 'LIKE_CANCEL_SUCCESS';
export const LIKE_CANCEL_FAIL = 'LIKE_CANCEL_FAIL';

export const LIKE_INIT = 'LIKE_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isAddLoding: false,
  isAddSuccess: false,
  isCancelLoading: false,
  isCancelSuccess: false,
  likeErrorStatus: null,
  likeAddErrorStatus: null,
  likeCancelErrorStatus: null,
  likeData: [],
};

export default function SignIn(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case LIKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        likeErrorStatus: null,
      };
    case LIKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        likeErrorStatus: 200,
        likeData: action.payload.likeData,
      };
    case LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        likeErrorStatus: action.error.status,
      };
    case LIKE_ADD_REQUEST:
      return {
        ...state,
        isAddLoding: true,
        isAddSuccess: false,
        likeAddErrorStatus: null,
      };
    case LIKE_ADD_SUCCESS:
      return {
        ...state,
        isAddLoding: false,
        isAddSuccess: true,
        likeAddErrorStatus: 200,
      };
    case LIKE_ADD_FAIL:
      return {
        ...state,
        isAddLoding: false,
        isAddSuccess: false,
        likeAddErrorStatus: action.error.status,
      };
    case LIKE_CANCEL_REQUEST:
      return {
        ...state,
        isCancelLoading: true,
        isCancelSuccess: false,
        likeCancelErrorStatus: null,
      };
    case LIKE_CANCEL_SUCCESS:
      return {
        ...state,
        isCancelLoading: false,
        isCancelSuccess: true,
        likeCancelErrorStatus: 200,
      };
    case LIKE_CANCEL_FAIL:
      return {
        ...state,
        isCancelLoading: false,
        isCancelSuccess: false,
        likeCancelErrorStatus: action.error.status,
      };
    case LIKE_INIT:
      return initialState;
    default:
      return state;
  }
}

export const LikeRequest = (data: { bookId: number }) => {
  return {
    type: LIKE_REQUEST,
    payload: data,
  };
};

export const LikeSuccess = (data: ResponseFavoriteSuccess) => {
  return {
    type: LIKE_SUCCESS,
    payload: data,
  };
};

export const LikeFail = (error: AxiosError) => {
  return {
    type: LIKE_FAIL,
    error: error.response,
  };
};

export const LikeAddRequest = (data: { bookId: number; state: number }) => {
  return {
    type: LIKE_ADD_REQUEST,
    payload: data,
  };
};

export const LikeAddSuccess = () => {
  return {
    type: LIKE_ADD_SUCCESS,
  };
};

export const LikeAddFail = (error: AxiosError) => {
  return {
    type: LIKE_ADD_FAIL,
    error: error.response,
  };
};

export const LikeCancelRequest = (data: { bookId: number }) => {
  return {
    type: LIKE_CANCEL_REQUEST,
    payload: data,
  };
};

export const LikeCancelSuccess = () => {
  return {
    type: LIKE_CANCEL_SUCCESS,
  };
};

export const LikeCancelFail = (error: AxiosError) => {
  return {
    type: LIKE_CANCEL_FAIL,
    error: error.response,
  };
};

export const LikeInit = () => {
  return {
    type: LIKE_INIT,
  };
};
