import { DeleteType, ParagraphAddTypes, ParagraphType } from 'types/api';

export const PARAGRAPH_INIT_REQUEST = 'PARAGRAPH_INIT_REQUEST';
export const PARAGRAPH_INIT_SUCCESS = 'PARAGRAPH_INIT_SUCCESS';
export const PARAGRAPH_INIT_FAIL = 'PARAGRAPH_INIT_FAIL';

export const PARAGRAPH_REQUEST = 'PARAGRAPH_REQUEST';
export const PARAGRAPH_SUCCESS = 'PARAGRAPH_SUCCESS';
export const PARAGRAPH_FAIL = 'PARAGRAPH_FAIL';

export const PARAGRAPH_ADD_REQUEST = 'PARAGRAPH_ADD_REQUEST';
export const PARAGRAPH_ADD_SUCCESS = 'PARAGRAPH_ADD_SUCCESS';
export const PARAGRAPH_ADD_FAIL = 'PARAGRAPH_ADD_FAIL';

export const PARAGRAPH_DELETE_REQUEST = 'PARAGRAPH_DELETE_REQUEST';
export const PARAGRAPH_DELETE_SUCCESS = 'PARAGRAPH_DELETE_SUCCESS';
export const PARAGRAPH_DELETE_FAIL = 'PARAGRAPH_DELETE_FAIL';

export const PARAGRAPH_INIT = 'PARAGRAPH_INIT';

const initialState = {
  initLoading: false,
  initSuccess: false,
  paragraphLoading: false,
  paragraphSuccess: false,
  isAddLoading: false,
  isAddSuccess: false,
  isDeleteLoading: false,
  isDeleteSuccess: false,
  paragraph: [],
};

export default function ChangePassword(state = initialState, action: any) {
  switch (action.type) {
    case PARAGRAPH_INIT_REQUEST:
      return {
        ...state,
        initLoading: true,
        initSuccess: false,
      };
    case PARAGRAPH_INIT_SUCCESS:
      return {
        ...state,
        initLoading: false,
        initSuccess: true,
        paragraph: action.data,
      };
    case PARAGRAPH_INIT_FAIL:
      return {
        ...state,
        initLoading: false,
        initSuccess: false,
      };
    case PARAGRAPH_REQUEST:
      return {
        ...state,
        paragraphLoading: true,
        paragraphSuccess: false,
      };
    case PARAGRAPH_SUCCESS:
      return {
        ...state,
        paragraphLoading: false,
        paragraphSuccess: true,
        paragraph: action.data,
      };
    case PARAGRAPH_FAIL:
      return {
        ...state,
        paragraphLoading: false,
        paragraphSuccess: false,
      };
    case PARAGRAPH_ADD_REQUEST:
      return {
        ...state,
        isAddLoading: true,
        isAddSuccess: false,
      };
    case PARAGRAPH_ADD_SUCCESS:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: true,
      };
    case PARAGRAPH_ADD_FAIL:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: false,
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
    case PARAGRAPH_INIT:
      return initialState;
    default:
      return state;
  }
}

export const ParagraphInitRequest = (data: ParagraphType) => {
  return {
    type: PARAGRAPH_INIT_REQUEST,
    payload: data,
  };
};

export const ParagraphInitSuccess = (data: any) => {
  return {
    type: PARAGRAPH_INIT_SUCCESS,
    data,
  };
};

export const ParagraphInitFail = (error: any) => {
  return {
    type: PARAGRAPH_INIT_FAIL,
    error: error.response,
  };
};

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

export const ParagraphAddRequest = (data: ParagraphAddTypes) => {
  return {
    type: PARAGRAPH_ADD_REQUEST,
    payload: data,
  };
};

export const ParagraphAddSuccess = () => {
  return {
    type: PARAGRAPH_ADD_SUCCESS,
  };
};

export const ParagraphAddFail = (error: any) => {
  return {
    type: PARAGRAPH_ADD_FAIL,
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

export const ParagraphInit = () => {
  return {
    type: PARAGRAPH_INIT,
  };
};
