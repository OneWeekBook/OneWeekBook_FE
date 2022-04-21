import { DeleteType, ParagraphSaveTypes, ParagraphType } from 'types/api';

export const PARAGRAPH_REQUEST = 'PARAGRAPH_REQUEST';
export const PARAGRAPH_SUCCESS = 'PARAGRAPH_SUCCESS';
export const PARAGRAPH_FAIL = 'PARAGRAPH_FAIL';

export const PARAGRAPH_SAVE_REQUEST = 'PARAGRAPH_SAVE_REQUEST';
export const PARAGRAPH_SAVE_SUCCESS = 'PARAGRAPH_SAVE_SUCCESS';
export const PARAGRAPH_SAVE_FAIL = 'PARAGRAPH_SAVE_FAIL';

export const PARAGRAPH_DELETE_REQUEST = 'PARAGRAPH_DELETE_REQUEST';
export const PARAGRAPH_DELETE_SUCCESS = 'PARAGRAPH_DELETE_SUCCESS';
export const PARAGRAPH_DELETE_FAIL = 'PARAGRAPH_DELETE_FAIL';

export const PARAGRAPH_INIT = 'PARAGRAPH_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isSaveLoading: false,
  isSaveSuccess: false,
  isDeleteLoading: false,
  isDeleteSuccess: false,
  paragraph: [],
};

export default function ChangePassword(state = initialState, action: any) {
  switch (action.type) {
    case PARAGRAPH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case PARAGRAPH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        paragraph: action.data,
      };
    case PARAGRAPH_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case PARAGRAPH_SAVE_REQUEST:
      return {
        ...state,
        isSaveLoading: true,
        isSaveSuccess: false,
      };
    case PARAGRAPH_SAVE_SUCCESS:
      return {
        ...state,
        isSaveLoading: false,
        isSaveSuccess: true,
      };
    case PARAGRAPH_SAVE_FAIL:
      return {
        ...state,
        isSaveLoading: false,
        isSaveSuccess: false,
      };
    case PARAGRAPH_DELETE_REQUEST:
      return {
        ...state,
        isDeleteLoading: true,
        isDeleteSuccess: false,
      };
    case PARAGRAPH_DELETE_SUCCESS:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: true,
      };
    case PARAGRAPH_DELETE_FAIL:
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccess: false,
      };
    default:
      return state;
  }
}

export const ParagraphRequest = (data: ParagraphType) => {
  return {
    type: PARAGRAPH_REQUEST,
    payload: data,
  };
};

export const ParagraphSuccess = (data: any) => {
  return {
    type: PARAGRAPH_SUCCESS,
    data,
  };
};

export const ParagraphFail = (error: any) => {
  return {
    type: PARAGRAPH_FAIL,
    error: error.response,
  };
};

export const ParagraphSaveRequest = (data: ParagraphSaveTypes) => {
  return {
    type: PARAGRAPH_SAVE_REQUEST,
    payload: data,
  };
};

export const ParagraphSaveSuccess = () => {
  return {
    type: PARAGRAPH_SAVE_SUCCESS,
  };
};

export const ParagraphSaveFail = (error: any) => {
  return {
    type: PARAGRAPH_SAVE_FAIL,
    error: error.response,
  };
};

export const ParagraphDeleteRequest = (data: DeleteType) => {
  return {
    type: PARAGRAPH_DELETE_REQUEST,
    payload: data,
  };
};

export const ParagraphDeleteSuccess = () => {
  return {
    type: PARAGRAPH_DELETE_SUCCESS,
  };
};

export const ParagraphDeleteFail = (error: any) => {
  return {
    type: PARAGRAPH_DELETE_FAIL,
    error: error.response,
  };
};
