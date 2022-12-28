import ListItem from "@mui/material/ListItem";
import React from "react";

export const ListSingleItem = ({ children, itemClassName }) => {
  return (
    <ListItem className={itemClassName ? itemClassName : ""}>
      {children}
    </ListItem>
  );
};
