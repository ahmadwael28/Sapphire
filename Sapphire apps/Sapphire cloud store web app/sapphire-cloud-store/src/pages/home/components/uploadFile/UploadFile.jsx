import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../../store/actions/DataActions";
import { filesUploadingSelector } from "../../../../store/selectors/DataSelector";

import { FilesUploadingList } from "../filesUploadingList/FilesUploadingList";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { FileUploader } from "react-drag-drop-files";

import "./UploadFile.scss";

export const UploadFile = () => {
  const dispatch = useDispatch();
  const filesUploading = useSelector(filesUploadingSelector);
  const [currentfile, setCurrentFile] = useState(null);

  const handleFileDrop = (file) => {
    //console.log(file);

    if (file) dispatch(uploadFile("file", file));
    console.log("file changed");
    setCurrentFile(file);
  };

  return (
    <div className="upload-file">
      <div className="upload-file__upload-methods-container">
        <FileUploader
          multiple={false}
          handleChange={handleFileDrop}
          //onSelect={handleFileSelect} TODO: fix selecting same file twice issue
          fileOrFiles={currentfile}
          name="file"
          classes="upload-file__upload-drag-area"
        >
          <div className="upload-file__upload-drag-area__drag-message">
            <DriveFolderUploadIcon />
            <p>Click to select a file or drag and drop a file here.</p>
          </div>
        </FileUploader>
      </div>

      <FilesUploadingList files={filesUploading} />
    </div>
  );
};
