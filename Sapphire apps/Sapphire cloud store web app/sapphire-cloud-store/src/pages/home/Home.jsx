import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../../store/selectors/AuthenticationSelector";
import "./Home.scss";

export const Home = () => {
  //   const [currentView, setCurrentView] = useState(0);

  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  });

  return <div>HOME PAGE</div>;
};
