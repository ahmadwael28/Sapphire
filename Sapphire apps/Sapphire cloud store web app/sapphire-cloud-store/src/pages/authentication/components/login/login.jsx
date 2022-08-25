import React, { useState } from "react";
import { TextBox } from "@common-controls/textbox/TextBox";
import { IconLabelButton } from "@common-controls/button/Button";
import { inputTypes, buttonVariants } from "@enums";
import strings from "./strings.json";

import logo from "@images/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import "./login.scss";

export const Login = ({ onCreateAccountClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    console.log("login");
  };

  const handleCreateAccountClick = () => {
    onCreateAccountClick && onCreateAccountClick();
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title-section">
          <div className="login__title-container">
            <img src={logo} className="login__app-img" alt="logo" />
            <div className="login_title-text">
              <div className="login__app-name">{strings.appName}</div>
              <div className="login__app-name__subtitle">
                {strings.welcomeMsg}
              </div>
            </div>
          </div>
        </div>
        <div className="login__cred-section">
          <div className="login__cred-inputs-container">
            <TextBox
              id="login-username"
              label={strings.username}
              onChange={setUsername}
              value={username}
              inputType={inputTypes.TEXT}
            />
            <TextBox
              id="login-password"
              label={strings.password}
              onChange={setPassword}
              value={password}
              inputType={inputTypes.PASSWORD}
            />
          </div>
          <div className="login__login-btn-container">
            <IconLabelButton
              onClick={handleLoginClick}
              label={strings.login}
              EndIcon={LoginIcon}
              variant={buttonVariants.CONTAINED}
              btnClassName="login__login-btn"
              iconClassName="login__login-btn__icon"
            />
          </div>
        </div>

        <div className="login__create-account">
          <IconLabelButton
            onClick={handleCreateAccountClick}
            label={strings.createAccount}
            EndIcon={CreateIcon}
            variant={buttonVariants.STRING}
            btnClassName="login__create-account__btn"
            iconClassName="login__create-account__btn__icon"
          />
        </div>
      </div>
    </div>
  );
};
