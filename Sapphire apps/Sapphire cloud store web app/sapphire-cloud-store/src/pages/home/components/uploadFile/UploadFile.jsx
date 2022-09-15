import React, { useState } from "react";
import { FilesUploadingList } from "../filesUploadingList/FilesUploadingList";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./UploadFile.scss";
import { FileUploader } from "react-drag-drop-files";

export const UploadFile = () => {
  const [files, setFiles] = useState([]);

  const handleFileDrop = (file) => {
    console.log(file);
    setFiles([...files, file]);
  };

  return (
    <div className="upload-file">
      <div className="upload-file__upload-methods-container">
        <FileUploader
          multiple={false}
          handleChange={handleFileDrop}
          onSelect={handleFileDrop}
          name="file"
          classes="upload-file__upload-drag-area"
        >
          <div className="upload-file__upload-drag-area__drag-message">
            <DriveFolderUploadIcon />
            <p>Click to select a file or drag and drop a file here.</p>
          </div>
        </FileUploader>
      </div>

      <FilesUploadingList files={files} />
    </div>
  );
};
