import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';
import { BookResponseTypes, ResponseSearchSuccess } from 'types/response';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export const SEARCH_INIT = 'SEARCH_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  moreBooks: false,
  books: Array<BookResponseTypes>(),
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
        moreBooks: action.payload.books.length === 12,
        books: state.books.concat(action.payload.books),
      };
    case SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case SEARCH_INIT:
      return initialState;
    default:
      return state;
  }
}

export const SearchRequest = (params: any) => {
  return {
    type: SEARCH_REQUEST,
    payload: params,
  };
};

export const SearchSuccess = (data: ResponseSearchSuccess) => {
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
