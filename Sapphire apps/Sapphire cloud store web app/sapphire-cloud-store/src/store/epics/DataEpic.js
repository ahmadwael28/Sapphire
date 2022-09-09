import { ofType, combineEpics } from "redux-observable";
import {
  distinctUntilChanged,
  mergeMap,
  switchMap,
  catchError,
  map,
} from "rxjs/operators";
import { EMPTY, from, of } from "rxjs";

import { GET_USER_DETAILS } from "../actionTypes";
import { fillUserDetails } from "../actions/DataActions";

export const getUserDetailsEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(GET_USER_DETAILS),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) +
        appConfig.services.auth.getUserDetails;

      return from(rest.getRequest(service)).pipe(
        switchMap((response) => {
          return of(fillUserDetails(response?.data));
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    })
  );
};

export const dataEpic = combineEpics(getUserDetailsEpic);
