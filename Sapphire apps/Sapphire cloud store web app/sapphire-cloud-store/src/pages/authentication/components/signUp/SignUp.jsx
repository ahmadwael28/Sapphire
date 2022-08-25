import React, { useState } from "react";
import { TextBox } from "@common-controls/textbox/TextBox";
import { IconLabelButton } from "@common-controls/button/Button";
import { inputTypes, buttonVariants } from "@enums";
import strings from "./strings.json";

import CreateIcon from "@mui/icons-material/Create";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./SignUp.scss";

export const SignUp = ({ onBackToLoginClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUpClick = () => {
    console.log("signup");
  };

  const handleBackToLoginClick = () => {
    onBackToLoginClick && onBackToLoginClick();
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__title-section">
          <div className="signup__title-container">
            <div className="signup_title-text">
              <div className="signup__app-name">{strings.title}</div>
              <div className="signup__app-name__subtitle">
                {strings.welcomeMsg}
              </div>
            </div>
          </div>
        </div>
        <div className="signup__cred-section">
          <div className="signup__cred-inputs-container">
            <TextBox
              id="signup-username"
              label={strings.username}
              onChange={setUsername}
              value={username}
              inputType={inputTypes.TEXT}
            />
            <TextBox
              id="signup-email"
              label={strings.email}
              onChange={setEmail}
              value={email}
              inputType={inputTypes.TEXT}
            />
            <TextBox
              id="signup-password"
              label={strings.password}
              onChange={setPassword}
              value={password}
              inputType={inputTypes.PASSWORD}
            />
            <TextBox
              id="signup-confirm-password"
              label={strings.confirmPassword}
              onChange={setConfirmPassword}
              value={confirmPassword}
              inputType={inputTypes.PASSWORD}
            />
          </div>
          <div className="signup__signup-btn-container">
            <IconLabelButton
              onClick={handleSignUpClick}
              label={strings.createAccount}
              EndIcon={CreateIcon}
              variant={buttonVariants.CONTAINED}
              btnClassName="signup__signup-btn"
              iconClassName="signup__signup-btn__icon"
            />
          </div>
        </div>

        <div className="signup__back-to-login">
          <IconLabelButton
            onClick={handleBackToLoginClick}
            label={strings.backToLogin}
            StartIcon={ArrowBackIosIcon}
            variant={buttonVariants.STRING}
            btnClassName="signup__back-to-login__btn"
            iconClassName="signup__back-to-login__btn__icon"
          />
        </div>
      </div>
    </div>
  );
};
