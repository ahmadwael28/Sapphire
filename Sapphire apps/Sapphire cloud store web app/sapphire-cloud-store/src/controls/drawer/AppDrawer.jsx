import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import "./AppDrawer.scss";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AppDrawer = ({ open, onDrawerClose, buttons, userDetails }) => {
  const handleDrawerClose = () => {
    onDrawerClose && onDrawerClose();
  };

  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <div className="app-drawer__card-header">
          {userDetails ? (
            <>
              <div className="app-drawer__card-header__avatar-container">
                <Avatar
                  aria-label="recipe"
                  className="app-drawer__card-header__avatar"
                />
              </div>

              <Typography className="app-drawer__card-header__title">
                {`${userDetails.firstName} ${userDetails.lastName}`}
              </Typography>

              <Typography className="app-drawer__card-header__sub-title">
                {userDetails.username}
              </Typography>

              <Typography className="app-drawer__card-header__sub-title">
                {userDetails.email}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton
                variant="circular"
                width={60}
                height={60}
                className="app-drawer__card-header__avatar-container"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "x-large", width: "100%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "small", width: "80%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "small", width: "80%" }}
              />
            </>
          )}
        </div>
      </DrawerHeader>
      <Divider />

      <List>
        {buttons.map((button, index) => (
          <ListItem key={button?.title} disablePadding>
            <ListItemButton onClick={button?.callback}>
              <ListItemIcon>{button?.icon}</ListItemIcon>
              <ListItemText primary={button?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
