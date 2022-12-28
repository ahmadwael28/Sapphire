import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  FILL_USERNAME_EXISTS,
  CLEAR_USERNAME_EXISTS,
  FILL_EMAIL_EXISTS,
  CLEAR_EMAIL_EXISTS,
  CLEAR_LOGIN_ERROR,
  CLEAR_SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP_SUCCESS,
  FILL_USER_DETAILS,
} from "../actionTypes";

const initialState = {
  isAuth: false,
  token: null,

  signupSucces: null,
  isUsernameExists: null,
  isEmailExists: null,
  loginError: {},
  signupError: {},

  userDetails: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        loginError: {},
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuth: false,
        token: null,
        loginError: { ...action.error },
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        token: null,
        loginError: {},
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSucces: true,
      };

    case CLEAR_SIGNUP_SUCCESS:
      return {
        ...state,
        signupSucces: null,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        isAuth: false,
        token: null,
        loginError: {},
        signupError: { ...action.error },
      };

    case FILL_USERNAME_EXISTS:
      return {
        ...state,
        isUsernameExists: action.isUsernameExists,
      };

    case CLEAR_USERNAME_EXISTS:
      return {
        ...state,
        isUsernameExists: null,
      };

    case FILL_EMAIL_EXISTS:
      return {
        ...state,
        isEmailExists: action.isEmailExists,
      };

    case CLEAR_EMAIL_EXISTS:
      return {
        ...state,
        isEmailExists: null,
      };

    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: {},
      };

    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        signupError: {},
      };

    case FILL_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...action.userDetials },
      };

    default:
      return state;
  }
}
