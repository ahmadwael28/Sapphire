import React from "react";
import { useSelector } from "react-redux";
import { userFilesSelector } from "../../../../store/selectors/DataSelector";

import { ListView } from "@common-controls/listView/ListView";
import { ListSingleItem } from "@common-controls/listItem/ListItem";
import { FileListItem } from "./fileListItem/FileListItem";

import "./FilesList.scss";

export const FilesList = ({}) => {
  const files = useSelector(userFilesSelector);
  return (
    <div className="files-list">
      <ListView listClassName="files-list__list">
        {files &&
          files.length &&
          files.map((file) => {
            return (
              <ListSingleItem itemClassName="files-list__list-item">
                <FileListItem fileInfo={file} />
              </ListSingleItem>
            );
          })}
      </ListView>
    </div>
  );
};
