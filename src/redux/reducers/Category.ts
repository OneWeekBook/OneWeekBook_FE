import { ActionsTypes } from 'types/request';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAIL = 'CATEGORY_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  categories: [],
};

export default function SignIn(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        categories: action.payload.categories,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}

export const CategoryRequest = () => {
  return {
    type: CATEGORY_REQUEST,
  };
};

export const CategorySuccess = (data: any) => {
  return {
    type: CATEGORY_SUCCESS,
    payload: data,
  };
};

export const CategoryFail = (error: any) => {
  return {
    type: CATEGORY_FAIL,
    error: error.response,
  };
};
