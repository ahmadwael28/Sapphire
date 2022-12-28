import { ofType, combineEpics } from "redux-observable";
import {
  distinctUntilChanged,
  mergeMap,
  switchMap,
  catchError,
  map,
  withLatestFrom,
} from "rxjs/operators";
import { EMPTY, from, of } from "rxjs";

import {
  GET_USER_DETAILS,
  PRE_UPLOAD_NEW_FILE,
  UPLOAD_NEW_FILE,
  GET_USER_FILES,
  DOWNLOAD_FILES,
} from "../actionTypes";
import {
  fillUserDetails,
  startUploadingFile,
  addFileUploading,
  removeFileUploading,
  fillUserFiles,
} from "../actions/DataActions";

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

export const preUploadFileEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(PRE_UPLOAD_NEW_FILE),
    distinctUntilChanged(),
    withLatestFrom(state$),
    switchMap(([action]) => {
      console.log("pre upload epic", action);
      const fileId = Date.now();
      const actions = [
        startUploadingFile(
          action?.fileParamName,
          action?.file,
          action?.additionalDataName,
          action?.additionalData,
          fileId
        ),
        addFileUploading(fileId, action?.file),
      ];

      return from(actions);
    })
  );
};

export const uploadFileEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(UPLOAD_NEW_FILE),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) + appConfig.services.data.uploadFile;

      return from(
        rest.uploadData(
          service,
          action?.fileParamName,
          action?.file,
          action?.additionalDataName,
          action?.additionalData
        )
      ).pipe(
        switchMap((response) => {
          return of(removeFileUploading(action.fileId));
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    })
  );
};

export const getUserFilesEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(GET_USER_FILES),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service =
        rest.getURLPrefix(appConfig.host) +
        appConfig.services.data.getUserFiles;

      return from(rest.getRequest(service)).pipe(
        switchMap((response) => {
          return of(fillUserFiles(response?.data));
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    })
  );
};

export const downloadFileEpic = (actions$, state$, { rest, appConfig }) => {
  return actions$.pipe(
    ofType(DOWNLOAD_FILES),
    distinctUntilChanged(),
    mergeMap((action) => {
      const service = `${rest.getURLPrefix(appConfig.host)}${
        appConfig.services.data.getSingleFile
      }/${action.file._id}`;
      console.log(service);

      return from(rest.getRequest(service)).pipe(
        switchMap((response) => {
          var element = document.createElement("a");
          element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(response.data)
          );
          element.setAttribute("download", action.file.name);

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();
          document.body.removeChild(element);
          return EMPTY;
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
    })
  );
};

export const dataEpic = combineEpics(
  getUserDetailsEpic,
  preUploadFileEpic,
  uploadFileEpic,
  getUserFilesEpic,
  downloadFileEpic
);
