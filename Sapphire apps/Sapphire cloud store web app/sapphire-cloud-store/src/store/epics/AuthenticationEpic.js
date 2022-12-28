import { ofType, combineEpics } from "redux-observable";
import {
  distinctUntilChanged,
  mergeMap,
  switchMap,
  catchError,
  map,
} from "rxjs/operators";
import { EMPTY, from, of } from "rxjs";

import {
  EMAIL_EXISTS,
  LOGIN,
  LOGOUT,
  SIGNUP,
  USERNAME_EXISTS,
} from "../actionTypes";
import {
  loginSuccess,
  loginFail,
  signupSuccess,
  signupFail,
  fillIsUsernameExists,
  fillIsEmailExists,
} from "../actions/AuthenticationActions";

export const loginEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(LOGIN),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) + appConfig.services.auth.login;

      return from(rest.postRequest(service, action.data)).pipe(
        switchMap((response) => {
          const { data } = response;
          rest.setToken(data);
          return of(loginSuccess(data));
        }),
        catchError((error) => {
          return of(loginFail(error?.response?.data));
        })
      );
    })
  );
};

export const signupEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(SIGNUP),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) + appConfig.services.auth.signup;

      return from(rest.postRequest(service, action.data)).pipe(
        switchMap((response) => {
          return of(signupSuccess());
        }),
        catchError((error) => {
          return of(signupFail(error?.response?.data));
        })
      );
    })
  );
};

export const isUsernameExists = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(USERNAME_EXISTS),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) +
        appConfig.services.auth.isUsernameExists;

      return from(rest.postRequest(service, action.data)).pipe(
        switchMap((response) => {
          return of(fillIsUsernameExists(response?.data?.usernameInUse));
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    })
  );
};

export const isEmailExists = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(EMAIL_EXISTS),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) +
        appConfig.services.auth.isEmailExists;

      return from(rest.postRequest(service, action.data)).pipe(
        switchMap((response) => {
          return of(fillIsEmailExists(response?.data?.emailExists));
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    })
  );
};

export const authenticationEpic = combineEpics(
  loginEpic,
  signupEpic,
  isUsernameExists,
  isEmailExists
);
