import { AxiosError } from 'axios';
import { ActionsTypes, ApiSearch } from 'types/api';
import { IBookSearchSuccess } from 'types/success';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export const ADD_SEARCH_REQUEST = 'ADD_SEARCH_REQUEST';
export const ADD_SEARCH_SUCCESS = 'ADD_SEARCH_SUCCESS';
export const ADD_SEARCH_FAIL = 'ADD_SEARCH_FAIL';

export const SEARCH_INIT = 'SEARCH_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  books: [],
};

export default function SignIn(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        books: action.payload.books,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case SEARCH_INIT:
      return initialState;
    case ADD_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case ADD_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        books: [...state.books, ...action.payload.books],
      };
    case ADD_SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}

export const SearchRequest = (params: ApiSearch) => {
  return {
    type: SEARCH_REQUEST,
    payload: params,
  };
};

export const SearchSuccess = (data: IBookSearchSuccess) => {
  return {
    type: SEARCH_SUCCESS,
    payload: data,
  };
};

export const SearchFail = (error: AxiosError) => {
  return {
    type: SEARCH_FAIL,
    error: error.response,
  };
};

export const SearchInit = () => {
  return {
    type: SEARCH_INIT,
  };
};

export const AddSearchRequest = (params: ApiSearch) => {
  return {
    type: ADD_SEARCH_REQUEST,
    payload: params,
  };
};

export const AddSearchSuccess = (data: IBookSearchSuccess) => {
  return {
    type: ADD_SEARCH_SUCCESS,
    payload: data,
  };
};

export const AddSearchFail = (error: AxiosError) => {
  return {
    type: ADD_SEARCH_FAIL,
    error: error.response,
  };
};
