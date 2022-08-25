import React, { useState } from "react";
import { MultipleViews } from "@common-controls/multipleView/MultipleView";
import { Login } from "./components/login/login";
import { SignUp } from "./components/signUp/SignUp";
import "./Authentication.scss";

export const Authentication = () => {
  const [currentView, setCurrentView] = useState(0);
  const onCreateAccountClick = () => {
    setCurrentView(1);
  };

  const onBackToLoginClick = () => {
    setCurrentView(0);
  };
  return (
    <div className="authentication__page-container">
      <div className="authentication__page-overlay">
        <div className="authentication__content">
          <div
            className={`authentication__auth-window authentication__auth-window__${
              currentView ? "signup-page-size" : "login-page-size"
            }`}
          >
            <MultipleViews
              containerClassName="authentication__multi-window"
              viewClassName="authentication__view"
              currentViewIndex={currentView}
              views={[
                <Login onCreateAccountClick={onCreateAccountClick} />,
                <SignUp onBackToLoginClick={onBackToLoginClick} />,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
