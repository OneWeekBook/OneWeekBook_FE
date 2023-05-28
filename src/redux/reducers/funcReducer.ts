import { ActionsTypes } from 'types/request';

export const USER_TOGGLE = 'USER_TOGGLE';
export const NAV_LIKE = 'NAV_LIKE';
export const NAV_READ = 'NAV_READ';
export const NAV_DONE = 'NAV_DONE';
export const NAV_INIT = 'NAV_INIT';
export const SEARCH_NONE = 'SEARCH_NONE';
export const SEARCH_DONE = 'SEARCH_DONE';

const initialState = {
  userToggle: false,
  navId: 0,
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
    case NAV_LIKE:
      return {
        ...state,
        navId: 0,
      };
    case NAV_READ:
      return {
        ...state,
        navId: 1,
      };
    case NAV_DONE:
      return {
        ...state,
        navId: 2,
      };
    case NAV_INIT:
      return initialState;
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

export const navLike = () => {
  return {
    type: NAV_LIKE,
  };
};

export const navRead = () => {
  return {
    type: NAV_READ,
  };
};

export const navDone = () => {
  return {
    type: NAV_DONE,
  };
};

export const navInit = () => {
  return {
    type: NAV_INIT,
  };
};
