import { GET_USER_DETAILS, FILL_USER_DETAILS } from "../actionTypes";

export const getUserDetails = () => ({ type: GET_USER_DETAILS });
export const fillUserDetails = (userDetials) => ({
  type: FILL_USER_DETAILS,
  userDetials,
});
