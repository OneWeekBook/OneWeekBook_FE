export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export const SEARCH_INIT = 'SEARCH_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  books: [],
};

export default function SignIn(state = initialState, action: any) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        params: action.params,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        books: action.data.books,
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
    params,
  };
};

export const SearchSuccess = (data: any) => {
  return {
    type: SEARCH_SUCCESS,
    data,
  };
};

export const SearchFail = (error: any) => {
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
