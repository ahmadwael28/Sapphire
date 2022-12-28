import React from "react";
import { useDispatch } from "react-redux";
import { downloadFile } from "../../../../../store/actions/DataActions";
import { AvatarControl } from "@common-controls/avatar/Avatar";

import FolderIcon from "@mui/icons-material/Folder";
import "./FileListItem.scss";

export const FileListItem = ({ fileInfo }) => {
  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(downloadFile(fileInfo.file));
    console.log(fileInfo);
    // var link = document.createElement("a");
    // link.download = fileInfo.file.name;
    // link.href = `${AppConfig.host.protocol}://${AppConfig.host.host}:${AppConfig.host.port}/${AppConfig.services.data.getSingleFile}/${fileInfo.file._id}`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // link.remove();
  };
  return (
    <div className="file-list-item" onClick={handleItemClick}>
      <div className="file-list-item__avatar-container">
        <AvatarControl className="file-list-item__avatar-container__avatar">
          <FolderIcon className="file-list-item__avatar-container__avatar__icon" />
        </AvatarControl>
      </div>

      <div className="file-list-item__info-container">
        <div>
          <p className="file-list-item__info">{fileInfo.file.name}</p>
        </div>
        <div>
          <p className="file-list-item__info">{fileInfo.file.date}</p>
        </div>
        <div>
          <p className="file-list-item__info">{fileInfo.file.size}</p>
        </div>
      </div>
    </div>
  );
};
