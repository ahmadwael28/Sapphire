import {
  GET_USER_DETAILS,
  FILL_USER_DETAILS,
  UPLOAD_NEW_FILE,
  PRE_UPLOAD_NEW_FILE,
  ADD_FILE_UPLOADING,
  REMOVE_FILE_UPLOADING,
  GET_USER_FILES,
  FILL_USER_FILES,
  DOWNLOAD_FILES,
} from "../actionTypes";

export const getUserDetails = () => ({ type: GET_USER_DETAILS });
export const fillUserDetails = (userDetials) => ({
  type: FILL_USER_DETAILS,
  userDetials,
});

export const uploadFile = (
  fileParamName,
  file,
  additionalDataName,
  additionalData
) => {
  console.log("upload file...", fileParamName, file);
  return {
    type: PRE_UPLOAD_NEW_FILE,
    fileParamName,
    file,
    additionalDataName,
    additionalData,
  };
};

export const startUploadingFile = (
  fileParamName,
  file,
  additionalDataName,
  additionalData,
  fileId
) => {
  console.log("starting upload", fileParamName, file);
  return {
    type: UPLOAD_NEW_FILE,
    fileParamName,
    file,
    additionalDataName,
    additionalData,
    fileId,
  };
};

export const addFileUploading = (fileId, file) => {
  console.log("adding file to files being uploaded", file);
  return {
    type: ADD_FILE_UPLOADING,
    id: fileId,
    file: file,
  };
};

export const removeFileUploading = (fileId) => {
  console.log("removing file to files being uploaded");
  return {
    type: REMOVE_FILE_UPLOADING,
    id: fileId,
  };
};

export const getUserFiles = () => ({ type: GET_USER_FILES });

export const fillUserFiles = (files) => ({
  type: FILL_USER_FILES,
  files: files,
});

export const downloadFile = (file) => ({
  type: DOWNLOAD_FILES,
  file: file,
});
