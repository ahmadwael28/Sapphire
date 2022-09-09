import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextBox } from "@common-controls/textbox/TextBox";
import { IconLabelButton } from "@common-controls/button/Button";
import { inputTypes, buttonVariants } from "@enums";
import {
  clearLoginError,
  login,
} from "../../../../store/actions/AuthenticationActions";
import {
  authErrorSelector,
  isAuthenticated,
} from "../../../../store/selectors/AuthenticationSelector";

import strings from "./strings.json";
import logo from "@images/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import "./login.scss";

export const Login = ({ onCreateAccountClick }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const dispatch = useDispatch();
  const error = useSelector(authErrorSelector);
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  }, [isAuth]);

  const validateInputs = () => {
    let isValid = true;
    if (!username.value) {
      setUsername({ ...username, error: strings.usernameReq });
      isValid = false;
    } else setUsername({ ...username, error: "" });

    if (!password.value) {
      setPassword({ ...password, error: strings.passwordReq });
      isValid = false;
    } else setPassword({ ...password, error: "" });

    return isValid;
  };

  const handleLoginClick = () => {
    dispatch(clearLoginError());
    if (validateInputs()) {
      dispatch(
        login({
          username: username.value,
          password: password.value,
        })
      );
    }
  };

  const handleCreateAccountClick = () => {
    onCreateAccountClick && onCreateAccountClick();
  };

  const handleUsernameChange = (value) => {
    setUsername({ ...username, value });
  };

  const handlePasswordChange = (value) => {
    setPassword({ ...password, value });
  };

  const handlePasswordKeyPress = (e) => {
    if (e.keyCode == 13) {
      handleLoginClick();
    }
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
              onChange={handleUsernameChange}
              value={username.value}
              inputType={inputTypes.TEXT}
              error={!!username.error}
              helperText={username.error ? username.error : ""}
            />
            <TextBox
              id="login-password"
              label={strings.password}
              onChange={handlePasswordChange}
              value={password.value}
              inputType={inputTypes.PASSWORD}
              error={!!password.error}
              helperText={password.error ? password.error : ""}
              onKeyDown={handlePasswordKeyPress}
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
          {error && error.msg && (
            <div className="login__login-error-continer">
              <p>{`${error.code}: ${error.msg}`}</p>
            </div>
          )}
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
