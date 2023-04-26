import { AxiosError } from 'axios';
import {
  LibraryAddRequestTypes,
  DeleteRequestType,
  ActionsTypes,
} from 'types/request';
import { LibraryResponseTypes } from 'types/response';

export const MY_LIBRARY_REQUEST = 'MY_LIBRARY_REQUEST';
export const MY_LIBRARY_SUCCESS = 'MY_LIBRARY_SUCCESS';
export const MY_LIBRARY_FAIL = 'MY_LIBRARY_FAIL';

export const MY_LIBRARY_ADD_REQUEST = 'MY_LIBRARY_ADD_REQUEST';
export const MY_LIBRARY_ADD_SUCCESS = 'MY_LIBRARY_ADD_SUCCESS';
export const MY_LIBRARY_ADD_FAIL = 'MY_LIBRARY_ADD_FAIL';

export const MY_LIBRARY_MODIFY_REQUEST = 'MY_LIBRARY_MODIFY_REQUEST';
export const MY_LIBRARY_MODIFY_SUCCESS = 'MY_LIBRARY_MODIFY_SUCCESS';
export const MY_LIBRARY_MODIFY_FAIL = 'MY_LIBRARY_MODIFY_FAIL';

export const MY_LIBRARY_DELETE_REQUEST = 'MY_LIBRARY_DELETE_REQUEST';
export const MY_LIBRARY_DELETE_SUCCESS = 'MY_LIBRARY_DELETE_SUCCESS';
export const MY_LIBRARY_DELETE_FAIL = 'MY_LIBRARY_DELETE_FAIL';

export const MY_LIBRARY_INIT = 'MY_LIBRARY_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isAddLoading: false,
  isAddSuccess: false,
  isModifyLoading: false,
  isModifySuccess: false,
  isDeleteLoading: false,
  isDeleteSuccess: false,
  userBookList: Array<LibraryResponseTypes>(),
};

export default function ChangePassword(
  state = initialState,
  action: ActionsTypes,
) {
  switch (action.type) {
    case MY_LIBRARY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case MY_LIBRARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userBookList: action.payload,
      };
    case MY_LIBRARY_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case MY_LIBRARY_ADD_REQUEST:
      return {
        ...state,
        isAddLoading: true,
        isAddSuccess: false,
      };
    case MY_LIBRARY_ADD_SUCCESS:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: true,
      };
    case MY_LIBRARY_ADD_FAIL:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: false,
      };
    case MY_LIBRARY_MODIFY_REQUEST:
      return {
        ...state,
        isModifyLoading: true,
        isModifySuccess: false,
      };
    case MY_LIBRARY_MODIFY_SUCCESS:
      return {
        ...state,
        isModifyLoading: false,
        isModifySuccess: true,
      };
    case MY_LIBRARY_MODIFY_FAIL:
      return {
        ...state,
        isModifyLoading: false,
        isModifySuccess: false,
      };
    case MY_LIBRARY_DELETE_REQUEST:
      return {
        ...state,
        isDeleteLoading: true,
        isDeleteSuccess: false,
      };
    case MY_LIBRARY_DELETE_SUCCESS:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: true,
      };
    case MY_LIBRARY_DELETE_FAIL:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: false,
      };
    case MY_LIBRARY_INIT:
      return initialState;
    default:
      return state;
  }
}

export const MyLibraryRequest = (data: { progress: number }) => {
  return {
    type: MY_LIBRARY_REQUEST,
    payload: data,
  };
};

export const MyLibrarySuccess = (data: any) => {
  return {
    type: MY_LIBRARY_SUCCESS,
    payload: data,
  };
};

export const MyLibraryFail = (error: AxiosError) => {
  return {
    type: MY_LIBRARY_FAIL,
    error: error.response,
  };
};

export const MyLibraryAddRequest = (data: LibraryAddRequestTypes) => {
  return {
    type: MY_LIBRARY_ADD_REQUEST,
    payload: data,
  };
};

export const MyLibraryAddSuccess = () => {
  return {
    type: MY_LIBRARY_ADD_SUCCESS,
  };
};

export const MyLibraryAddFail = (error: AxiosError) => {
  return {
    type: MY_LIBRARY_ADD_FAIL,
    error: error.response,
  };
};

export const MyLibraryModifyRequest = (data: {
  progress: number;
  isbn: string;
}) => {
  return {
    type: MY_LIBRARY_MODIFY_REQUEST,
    payload: data,
  };
};

export const MyLibraryModifySuccess = () => {
  return {
    type: MY_LIBRARY_MODIFY_SUCCESS,
  };
};

export const MyLibraryModifyFail = (error: AxiosError) => {
  return {
    type: MY_LIBRARY_MODIFY_FAIL,
    error: error.response,
  };
};

export const MyLibraryDeleteRequest = (data: DeleteRequestType) => {
  return {
    type: MY_LIBRARY_DELETE_REQUEST,
    payload: data,
  };
};

export const MyLibraryDeleteSuccess = () => {
  return {
    type: MY_LIBRARY_DELETE_SUCCESS,
  };
};

export const MyLibraryDeleteFail = (error: AxiosError) => {
  return {
    type: MY_LIBRARY_DELETE_FAIL,
    error: error.response,
  };
};

export const MyLibraryInit = () => {
  return {
    type: MY_LIBRARY_INIT,
  };
};
