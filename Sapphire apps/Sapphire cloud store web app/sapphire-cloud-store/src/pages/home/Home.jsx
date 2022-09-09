import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDrawer } from "../../controls/drawer/AppDrawer";
import { getUserDetails } from "../../store/actions/DataActions";

import { isAuthenticated } from "../../store/selectors/AuthenticationSelector";
import { userDetailsSelector } from "../../store/selectors/DataSelector";
import { NavigationBar } from "./components/navigationBar/NavigationBar";

import strings from "./strings.json";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Home.scss";

export const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuth = useSelector(isAuthenticated);
  const userData = useSelector(userDetailsSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(userData).length) dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleDrawerBtnClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSignOut = () => {
    console.log("Logout");
  };

  const drawerBtns = [
    {
      title: strings.logout,
      icon: <LogoutIcon />,
      callback: handleSignOut,
    },
  ];

  return (
    <div className="home__page-container">
      <NavigationBar onDrawerBtnClick={handleDrawerBtnClick} />
      <AppDrawer
        open={drawerOpen}
        onDrawerClose={handleDrawerClose}
        buttons={drawerBtns}
        userDetails={userData}
      />
    </div>
  );
};
