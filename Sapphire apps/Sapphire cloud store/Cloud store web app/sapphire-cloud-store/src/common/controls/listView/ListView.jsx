import List from "@mui/material/List";
import React from "react";

export const ListView = ({ children, listClassName }) => {
  return <List className={listClassName ? listClassName : ""}>{children}</List>;
};
