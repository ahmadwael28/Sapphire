import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import FolderIcon from "@mui/icons-material/Folder";
import CheckIcon from "@mui/icons-material/Check";
import { CircularProgress, Fab } from "@mui/material";

import "./FilesUploadingList.scss";

export const FilesUploadingList = ({ files }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: 220,
        overflow: "auto",
        bgcolor: "background.paper",
      }}
    >
      {files && files.length
        ? files.map((file) => {
            const fileSize =
              file.size >= 1048576
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : file.size > 1024
                ? `${(file.size / 1024).toFixed(1)} KB`
                : `${file.size} Bytes`;
            return (
              <ListItem className="files-uploading-list__list-item">
                <div className="files-uploading-list__file-info-container">
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={file.name} secondary={fileSize} />
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
              </ListItem>
            );
          })
        : null}
    </List>
  );
};
