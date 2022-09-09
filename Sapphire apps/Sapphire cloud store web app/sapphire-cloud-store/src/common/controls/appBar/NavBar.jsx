import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

import "./NavBar.scss";

export const NavBar = ({ title, rightComponent, onDrawerBtnClick }) => {
  const handleDrawerClick = () => {
    if (onDrawerBtnClick) onDrawerBtnClick();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={handleDrawerClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          {title}
        </Typography>
        {rightComponent}
      </Toolbar>
    </AppBar>
  );
};
