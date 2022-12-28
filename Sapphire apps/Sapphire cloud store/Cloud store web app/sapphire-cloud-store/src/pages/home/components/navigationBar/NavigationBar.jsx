import React from "react";
import { NavBar } from "@common-controls/appBar/NavBar";
import { SearchBar } from "@common-controls/searchBar/SearchBar";
import logo from "@images/logo.png";
import strings from "./strings.json";
import "./NavigationBar.scss";

export const NavigationBar = ({ onDrawerBtnClick }) => {
  const handleDrawerBtnClick = () => {
    onDrawerBtnClick && onDrawerBtnClick();
  };

  const handleSearch = (searchKey) => {
    console.log("search for", searchKey);
  };

  return (
    <NavBar
      onDrawerBtnClick={handleDrawerBtnClick}
      title={
        <div className="navigation-bar__title-container">
          <img src={logo} className="navigation-bar__app-img" alt="logo" />
          <div className="navigation-bar__app-name">{strings.appName}</div>
        </div>
      }
      rightComponent={<SearchBar onSearch={handleSearch} />}
    />
  );
};
