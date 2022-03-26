export const USER_TOGGLE = 'USER_TOGGLE';

const initialState = {
  userToggle: false,
};

export default function FuncToggle(state = initialState, action: any) {
  switch (action.type) {
    case USER_TOGGLE:
      return {
        ...state,
        userToggle: !state.userToggle,
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
