import { SHOW_MESSAGE, CLEAR_MESSAGE } from "../actionTypes";

export const showMessage = (message, duration, msgType) => ({
  type: SHOW_MESSAGE,
  message,
  duration,
  msgType,
});
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
