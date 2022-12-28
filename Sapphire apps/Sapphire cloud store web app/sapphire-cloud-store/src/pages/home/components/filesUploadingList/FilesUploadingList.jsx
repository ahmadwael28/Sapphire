import * as React from "react";
import { ListView } from "@common-controls/listView/ListView";
import { ListSingleItem } from "@common-controls/listItem/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import FolderIcon from "@mui/icons-material/Folder";
import CheckIcon from "@mui/icons-material/Check";
import { CircularProgress, Fab } from "@mui/material";

import "./FilesUploadingList.scss";

export const FilesUploadingList = ({ files }) => {
  const fileKeys = Object.keys(files);
  return (
    <ListView listClassName="files-uploading-list__list">
      {files && fileKeys.length
        ? fileKeys.map((key) => {
            console.log(files, fileKeys, files[key]);
            const fileSize =
              files[key]?.size >= 1048576
                ? `${(files[key]?.size / 1024 / 1024).toFixed(2)} MB`
                : files[key]?.size > 1024
                ? `${(files[key]?.size / 1024).toFixed(1)} KB`
                : `${files[key]?.size} Bytes`;
            return (
              <ListSingleItem itemClassName="files-uploading-list__list-item">
                <div className="files-uploading-list__file-info-container">
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={files[key]?.name}
                    secondary={fileSize}
                  />
                </div>
                <div>
                  <CircularProgress />
                  {/* TODO: add when file upload status is ready
                    <Fab
                        color="primary"
                        className="files-uploading-list__list-item__success-fab"
                    >
                        <CheckIcon />
                    </Fab> 
                  */}
                </div>
              </ListSingleItem>
            );
          })
        : null}
    </ListView>
  );
};
