import {
  FILL_USER_DETAILS,
  ADD_FILE_UPLOADING,
  REMOVE_FILE_UPLOADING,
  FILL_USER_FILES,
} from "../actionTypes";

const initialState = {
  userDetails: {},
  userFiles: [],
  filesBeingUploaded: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILL_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...action.userDetials },
      };
    case ADD_FILE_UPLOADING:
      console.log("file added to files being uploaded w di 7aga ra2e3a");
      return {
        ...state,
        filesBeingUploaded: {
          ...state.filesBeingUploaded,
          [action?.id]: action?.file,
        },
      };

    case REMOVE_FILE_UPLOADING:
      console.log("OFF A7");
      const filesUploading = { ...state.filesBeingUploaded };
      delete filesUploading[action?.id];
      return {
        ...state,
        filesBeingUploaded: {
          ...filesUploading,
        },
      };

    case FILL_USER_FILES:
      return {
        ...state,

        userFiles: [...action.files],
      };

    default:
      return state;
  }
}
