import { AxiosError } from 'axios';
import {
  LibraryAddRequestTypes,
  DeleteRequestType,
  ActionsTypes,
} from 'types/request';
import { LibraryResponseTypes } from 'types/response';

export const LIBRARY_REQUEST = 'LIBRARY_REQUEST';
export const LIBRARY_SUCCESS = 'LIBRARY_SUCCESS';
export const LIBRARY_FAIL = 'LIBRARY_FAIL';

export const LIBRARY_ADD_REQUEST = 'LIBRARY_ADD_REQUEST';
export const LIBRARY_ADD_SUCCESS = 'LIBRARY_ADD_SUCCESS';
export const LIBRARY_ADD_FAIL = 'LIBRARY_ADD_FAIL';

export const LIBRARY_MODIFY_REQUEST = 'LIBRARY_MODIFY_REQUEST';
export const LIBRARY_MODIFY_SUCCESS = 'LIBRARY_MODIFY_SUCCESS';
export const LIBRARY_MODIFY_FAIL = 'LIBRARY_MODIFY_FAIL';

export const LIBRARY_DELETE_REQUEST = 'LIBRARY_DELETE_REQUEST';
export const LIBRARY_DELETE_SUCCESS = 'LIBRARY_DELETE_SUCCESS';
export const LIBRARY_DELETE_FAIL = 'LIBRARY_DELETE_FAIL';

export const LIBRARY_INIT = 'LIBRARY_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isAddLoading: false,
  isAddSuccess: false,
  isModifyLoading: false,
  isModifySuccess: false,
  isDeleteLoading: false,
  isDeleteSuccess: false,
  libraryBookList: Array<LibraryResponseTypes>(),
};

export default function libraryReducer(
  state = initialState,
  action: ActionsTypes,
) {
  switch (action.type) {
    case LIBRARY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case LIBRARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        libraryBookList: action.payload,
      };
    case LIBRARY_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case LIBRARY_ADD_REQUEST:
      return {
        ...state,
        isAddLoading: true,
        isAddSuccess: false,
      };
    case LIBRARY_ADD_SUCCESS:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: true,
      };
    case LIBRARY_ADD_FAIL:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: false,
      };
    case LIBRARY_MODIFY_REQUEST:
      return {
        ...state,
        isModifyLoading: true,
        isModifySuccess: false,
      };
    case LIBRARY_MODIFY_SUCCESS:
      return {
        ...state,
        isModifyLoading: false,
        isModifySuccess: true,
      };
    case LIBRARY_MODIFY_FAIL:
      return {
        ...state,
        isModifyLoading: false,
        isModifySuccess: false,
      };
    case LIBRARY_DELETE_REQUEST:
      return {
        ...state,
        isDeleteLoading: true,
        isDeleteSuccess: false,
      };
    case LIBRARY_DELETE_SUCCESS:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: true,
      };
    case LIBRARY_DELETE_FAIL:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: false,
      };
    case LIBRARY_INIT:
      return initialState;
    default:
      return state;
  }
}

export const libraryRequest = (data: { progress: number }) => {
  return {
    type: LIBRARY_REQUEST,
    payload: data,
  };
};

export const librarySuccess = (data: LibraryResponseTypes[]) => {
  return {
    type: LIBRARY_SUCCESS,
    payload: data,
  };
};

export const libraryFail = (error: AxiosError) => {
  return {
    type: LIBRARY_FAIL,
    error: error.response,
  };
};

export const libraryAddRequest = (data: LibraryAddRequestTypes) => {
  return {
    type: LIBRARY_ADD_REQUEST,
    payload: data,
  };
};

export const libraryAddSuccess = () => {
  return {
    type: LIBRARY_ADD_SUCCESS,
  };
};

export const libraryAddFail = (error: AxiosError) => {
  return {
    type: LIBRARY_ADD_FAIL,
    error: error.response,
  };
};

export const libraryModifyRequest = (data: {
  progress: number;
  isbn: string;
}) => {
  return {
    type: LIBRARY_MODIFY_REQUEST,
    payload: data,
  };
};

export const libraryModifySuccess = () => {
  return {
    type: LIBRARY_MODIFY_SUCCESS,
  };
};

export const libraryModifyFail = (error: AxiosError) => {
  return {
    type: LIBRARY_MODIFY_FAIL,
    error: error.response,
  };
};

export const libraryDeleteRequest = (data: DeleteRequestType) => {
  return {
    type: LIBRARY_DELETE_REQUEST,
    payload: data,
  };
};

export const libraryDeleteSuccess = () => {
  return {
    type: LIBRARY_DELETE_SUCCESS,
  };
};

export const libraryDeleteFail = (error: AxiosError) => {
  return {
    type: LIBRARY_DELETE_FAIL,
    error: error.response,
  };
};

export const libraryInit = () => {
  return {
    type: LIBRARY_INIT,
  };
};
