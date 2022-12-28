import * as React from "react";
import Avatar from "@mui/material/Avatar";

export const AvatarControl = ({ children, className, avatarProps }) => {
  return (
    <Avatar className={className ? className : ""} {...avatarProps}>
      {children}
    </Avatar>
  );
};
