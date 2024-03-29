import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';
import { ResponseCategorySuccess } from 'types/response';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAIL = 'CATEGORY_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  categories: [],
};

export default function categoryReducer(
  state = initialState,
  action: ActionsTypes,
) {
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

export const categoryRequest = () => {
  return {
    type: CATEGORY_REQUEST,
  };
};

export const categorySuccess = (data: ResponseCategorySuccess) => {
  return {
    type: CATEGORY_SUCCESS,
    payload: data,
  };
};

export const categoryFail = (error: AxiosError) => {
  return {
    type: CATEGORY_FAIL,
    error: error.response,
  };
};
