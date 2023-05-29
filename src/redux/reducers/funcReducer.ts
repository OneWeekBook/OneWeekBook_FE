import { ActionsTypes } from 'types/request';

export const USER_TOGGLE = 'USER_TOGGLE';
export const SEARCH_NONE = 'SEARCH_NONE';
export const SEARCH_DONE = 'SEARCH_DONE';

const initialState = {
  userToggle: false,
  search: false,
};

export default function funcReducer(
  state = initialState,
  action: ActionsTypes,
) {
  switch (action.type) {
    case USER_TOGGLE:
      return {
        ...state,
        userToggle: !state.userToggle,
      };
    case SEARCH_NONE:
      return {
        ...state,
        search: false,
      };
    case SEARCH_DONE:
      return {
        ...state,
        search: true,
      };
    default:
      return state;
  }
}

export const userToggle = () => {
  return {
    type: USER_TOGGLE,
  };
};

export const searchDone = () => {
  return {
    type: SEARCH_DONE,
  };
};

export const searchNone = () => {
  return {
    type: SEARCH_NONE,
  };
};
