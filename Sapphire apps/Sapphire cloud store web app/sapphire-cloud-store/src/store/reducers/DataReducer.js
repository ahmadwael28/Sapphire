import { FILL_USER_DETAILS } from "../actionTypes";

const initialState = {
  userDetails: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILL_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...action.userDetials },
      };

    default:
      return state;
  }
}
