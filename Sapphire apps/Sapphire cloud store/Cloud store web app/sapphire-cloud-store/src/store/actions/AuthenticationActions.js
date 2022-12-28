import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USERNAME_EXISTS,
  FILL_USERNAME_EXISTS,
  CLEAR_USERNAME_EXISTS,
  EMAIL_EXISTS,
  FILL_EMAIL_EXISTS,
  CLEAR_EMAIL_EXISTS,
  CLEAR_SIGNUP_ERROR,
  CLEAR_LOGIN_ERROR,
  CLEAR_SIGNUP_SUCCESS,
} from "../actionTypes";

export const login = (data) => ({ type: LOGIN, data });
export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, token });
export const loginFail = (error) => ({ type: LOGIN_FAIL, error });

export const signup = (data) => ({ type: SIGNUP, data });
export const checkIsUsernameExists = (data) => ({
  type: USERNAME_EXISTS,
  data,
});
export const fillIsUsernameExists = (isUsernameExists) => ({
  type: FILL_USERNAME_EXISTS,
  isUsernameExists,
});
export const clearIsUsernameExists = () => ({
  type: CLEAR_USERNAME_EXISTS,
});

export const checkIsEmailExists = (data) => ({
  type: EMAIL_EXISTS,
  data,
});

export const fillIsEmailExists = (isEmailExists) => ({
  type: FILL_EMAIL_EXISTS,
  isEmailExists,
});
export const clearIsEmailExists = () => ({
  type: CLEAR_EMAIL_EXISTS,
});

export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const clearSignupSuccess = () => ({ type: CLEAR_SIGNUP_SUCCESS });
export const signupFail = (error) => ({ type: SIGNUP_FAIL, error });
export const clearSignupError = () => ({ type: CLEAR_SIGNUP_ERROR });
export const clearLoginError = () => ({ type: CLEAR_LOGIN_ERROR });
