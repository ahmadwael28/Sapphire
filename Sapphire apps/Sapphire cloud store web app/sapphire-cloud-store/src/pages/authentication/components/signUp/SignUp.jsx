import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//components
import { TextBox } from "@common-controls/textbox/TextBox";
import { IconLabelButton } from "@common-controls/button/Button";
import CreateIcon from "@mui/icons-material/Create";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";

// store
import {
  checkIsEmailExists,
  checkIsUsernameExists,
  clearIsEmailExists,
  clearIsUsernameExists,
  clearSignupError,
  clearSignupSuccess,
  signup,
} from "../../../../store/actions/AuthenticationActions";
import {
  signUpErrorSelector,
  isUsernameExistsSelector,
  isEmailExistsSelector,
  signupSuccessSelector,
} from "../../../../store/selectors/AuthenticationSelector";

import { inputTypes, buttonVariants } from "@enums";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import "./SignUp.scss";

import strings from "./strings.json";

export const SignUp = ({ onBackToLoginClick }) => {
  const [firstname, setFirstname] = useState({ value: "", error: "" });
  const [lastname, setLastname] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const dispatch = useDispatch();
  const error = useSelector(signUpErrorSelector);
  const isUsernameExists = useSelector(isUsernameExistsSelector);
  const isEmailExists = useSelector(isEmailExistsSelector);
  const isSignupSuccess = useSelector(signupSuccessSelector);

  const validateInputs = () => {
    let isValid = true;
    if (!firstname.value) {
      setFirstname({ ...firstname, error: strings.firstnameReq });
      isValid = false;
    } else setFirstname({ ...firstname, error: "" });

    if (!lastname.value) {
      setLastname({ ...lastname, error: strings.lastnameReq });
      isValid = false;
    } else setLastname({ ...lastname, error: "" });

    if (!username.value) {
      setUsername({ ...username, error: strings.usernameReq });
      isValid = false;
    } else setUsername({ ...username, error: "" });

    if (!email.value) {
      setEmail({ ...email, error: strings.emailReq });
      isValid = false;
    } else setEmail({ ...email, error: "" });

    if (!password.value) {
      setPassword({ ...password, error: strings.passwordReq });
      isValid = false;
    } else setPassword({ ...password, error: "" });

    if (!confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: strings.passwordVerReq });
      isValid = false;
    } else setConfirmPassword({ ...confirmPassword, error: "" });

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        error: strings.unmatchingPasswords,
      });
      isValid = false;
    } else setConfirmPassword({ ...confirmPassword, error: "" });

    return isValid;
  };

  const handleSignUpClick = () => {
    dispatch(clearSignupError());
    if (validateInputs()) {
      console.log("valid");
      dispatch(
        signup({
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value,
          username: username.value,
          password: password.value,
        })
      );
    }
  };

  const handleBackToLoginClick = () => {
    onBackToLoginClick && onBackToLoginClick();
  };

  const handleFirstnameChange = (value) => {
    setFirstname({ ...firstname, value });
  };

  const handleLastnameChange = (value) => {
    setLastname({ ...lastname, value });
  };

  const handleUsernameChange = (value) => {
    setUsername({ ...username, value });
    dispatch(clearIsUsernameExists());
  };

  const handleUsernameBlur = (e) => {
    const value = e.target.value;
    if (value)
      dispatch(
        checkIsUsernameExists({
          username: value,
        })
      );
  };

  const handleEmailChange = (value) => {
    setEmail({ ...email, value });
    dispatch(clearIsEmailExists());
  };

  const handleEmailBlur = (e) => {
    const value = e.target.value;
    if (value) console.log(value);
    dispatch(
      checkIsEmailExists({
        email: value,
      })
    );
  };

  const handlePasswordChange = (value) => {
    setPassword({ ...password, value });
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword({ ...confirmPassword, value });
  };

  const clearSignupForm = () => {
    setFirstname({ ...firstname, error: "", value: "" });
    setLastname({ ...lastname, error: "", value: "" });
    setUsername({ ...username, error: "", value: "" });
    setEmail({ ...email, error: "", value: "" });
    setPassword({ ...password, error: "", value: "" });
    setConfirmPassword({ ...confirmPassword, error: "", value: "" });
    dispatch(clearIsUsernameExists());
    dispatch(clearIsEmailExists());
  };

  useEffect(() => {
    if (isSignupSuccess) {
      // clear signup form
      clearSignupForm(); // TODO: check reset issue in ui
      // show success notification
      // navigate to login
      handleBackToLoginClick();
      // clear isSignupSuccess
      dispatch(clearSignupSuccess());
    }
  }, [isSignupSuccess]);

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
              id="signup-firstname"
              label={strings.firstname}
              onChange={handleFirstnameChange}
              value={firstname.value}
              inputType={inputTypes.TEXT}
              error={!!firstname.error}
              helperText={firstname.error ? firstname.error : ""}
            />
            <TextBox
              id="signup-lastname"
              label={strings.lastname}
              onChange={handleLastnameChange}
              value={lastname.value}
              inputType={inputTypes.TEXT}
              error={!!lastname.error}
              helperText={lastname.error ? lastname.error : ""}
            />

            <TextBox
              id="signup-username"
              label={strings.username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              value={username.value}
              inputType={inputTypes.TEXT_WITH_INDICATOR}
              error={!!username.error}
              helperText={username.error ? username.error : ""}
              indicator={
                typeof isUsernameExists == "boolean" ? (
                  isUsernameExists ? (
                    <Tooltip
                      title={strings.usernameExists}
                      placement="top-start"
                      arrow
                    >
                      <ErrorIcon className="signup__warning-icon" />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={strings.usernameAvailable}
                      placement="top-start"
                      arrow
                    >
                      <CheckCircleIcon className="signup__success-icon" />
                    </Tooltip>
                  )
                ) : null
              }
            />
            <TextBox
              id="signup-email"
              label={strings.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              value={email.value}
              inputType={inputTypes.TEXT_WITH_INDICATOR}
              error={!!email.error}
              helperText={email.error ? email.error : ""}
              indicator={
                typeof isEmailExists == "boolean" ? (
                  isEmailExists ? (
                    <Tooltip
                      title={strings.emailExists}
                      placement="top-start"
                      arrow
                    >
                      <ErrorIcon className="signup__warning-icon" />
                    </Tooltip>
                  ) : (
                    <CheckCircleIcon className="signup__success-icon" />
                  )
                ) : null
              }
            />
            <TextBox
              id="signup-password"
              label={strings.password}
              onChange={handlePasswordChange}
              value={password.value}
              inputType={inputTypes.PASSWORD}
              error={!!password.error}
              helperText={password.error ? password.error : ""}
            />
            <TextBox
              id="signup-confirm-password"
              label={strings.confirmPassword}
              onChange={handleConfirmPasswordChange}
              value={confirmPassword.value}
              inputType={inputTypes.PASSWORD}
              error={!!confirmPassword.error}
              helperText={confirmPassword.error ? confirmPassword.error : ""}
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

          {error && error.msg && (
            <div className="signup__signup-error-continer">
              <p>{`${error.code}: ${error.msg}`}</p>
            </div>
          )}
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
