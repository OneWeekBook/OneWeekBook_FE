import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';
import { ResponseFavoriteSuccess } from 'types/response';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
export const FAVORITE_FAIL = 'FAVORITE_FAIL';

export const FAVORITE_ADD_REQUEST = 'FAVORITE_ADD_REQUEST';
export const FAVORITE_ADD_SUCCESS = 'FAVORITE_ADD_SUCCESS';
export const FAVORITE_ADD_FAIL = 'FAVORITE_ADD_FAIL';

export const FAVORITE_CANCEL_REQUEST = 'FAVORITE_CANCEL_REQUEST';
export const FAVORITE_CANCEL_SUCCESS = 'FAVORITE_CANCEL_SUCCESS';
export const FAVORITE_CANCEL_FAIL = 'FAVORITE_CANCEL_FAIL';

export const FAVORITE_INIT = 'FAVORITE_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isAddLoding: false,
  isAddSuccess: false,
  isCancelLoading: false,
  isCancelSuccess: false,
  favoriteErrorStatus: null,
  favoriteAddErrorStatus: null,
  favoriteCancelErrorStatus: null,
  favoriteData: [],
};

export default function favoriteReducer(
  state = initialState,
  action: ActionsTypes,
) {
  switch (action.type) {
    case FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        favoriteErrorStatus: null,
      };
    case FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        favoriteErrorStatus: 200,
        favoriteData: action.payload.likeData,
      };
    case FAVORITE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        favoriteErrorStatus: action.error.status,
      };
    case FAVORITE_ADD_REQUEST:
      return {
        ...state,
        isAddLoding: true,
        isAddSuccess: false,
        favoriteAddErrorStatus: null,
      };
    case FAVORITE_ADD_SUCCESS:
      return {
        ...state,
        isAddLoding: false,
        isAddSuccess: true,
        favoriteAddErrorStatus: 200,
      };
    case FAVORITE_ADD_FAIL:
      return {
        ...state,
        isAddLoding: false,
        isAddSuccess: false,
        favoriteAddErrorStatus: action.error.status,
      };
    case FAVORITE_CANCEL_REQUEST:
      return {
        ...state,
        isCancelLoading: true,
        isCancelSuccess: false,
        favoriteCancelErrorStatus: null,
      };
    case FAVORITE_CANCEL_SUCCESS:
      return {
        ...state,
        isCancelLoading: false,
        isCancelSuccess: true,
        favoriteCancelErrorStatus: 200,
      };
    case FAVORITE_CANCEL_FAIL:
      return {
        ...state,
        isCancelLoading: false,
        isCancelSuccess: false,
        favoriteCancelErrorStatus: action.error.status,
      };
    case FAVORITE_INIT:
      return initialState;
    default:
      return state;
  }
}

export const favoriteRequest = (data: { bookId: number }) => {
  return {
    type: FAVORITE_REQUEST,
    payload: data,
  };
};

export const favoriteSuccess = (data: ResponseFavoriteSuccess) => {
  return {
    type: FAVORITE_SUCCESS,
    payload: data,
  };
};

export const favoriteFail = (error: AxiosError) => {
  return {
    type: FAVORITE_FAIL,
    error: error.response,
  };
};

export const favoriteAddRequest = (data: {
  bookId: number;
  state: number;
  isbn: number;
  start: number;
  sortby: string;
}) => {
  return {
    type: FAVORITE_ADD_REQUEST,
    payload: data,
  };
};

export const favoriteAddSuccess = () => {
  return {
    type: FAVORITE_ADD_SUCCESS,
  };
};

export const favoriteAddFail = (error: AxiosError) => {
  return {
    type: FAVORITE_ADD_FAIL,
    error: error.response,
  };
};

export const favoriteCancelRequest = (data: {
  bookId: number;
  isbn: number;
  start: number;
  sortby: string;
}) => {
  return {
    type: FAVORITE_CANCEL_REQUEST,
    payload: data,
  };
};

export const favoriteCancelSuccess = () => {
  return {
    type: FAVORITE_CANCEL_SUCCESS,
  };
};

export const favoriteCancelFail = (error: AxiosError) => {
  return {
    type: FAVORITE_CANCEL_FAIL,
    error: error.response,
  };
};

export const favoriteInit = () => {
  return {
    type: FAVORITE_INIT,
  };
};
