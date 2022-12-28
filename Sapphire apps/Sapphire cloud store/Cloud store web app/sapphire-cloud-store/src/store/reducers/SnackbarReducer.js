import { SHOW_MESSAGE, CLEAR_MESSAGE } from "../actionTypes";

const initialState = {
  message: "",
  duration: 0,
  type: "",
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.message,
        duration: action.duration,
        type: action.msgType,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
        duration: 0,
        type: "",
      };
    default:
      return state;
  }
}
