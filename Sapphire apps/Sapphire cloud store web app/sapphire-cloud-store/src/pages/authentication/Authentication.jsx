import React, { useState } from "react";
import { CarouselView } from "@common-controls/carouselView/CarouselView";
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
            className={`authentication__auth-window authentication__auth-window__${"signup-page-size"}`}
          >
            <CarouselView
              autoPlay={false}
              indicators={false}
              swipe={false}
              cycleNavigation={false}
              changeOnFirstRender={false}
              navButtonsAlwaysInvisible={true}
              animation="fade"
              animationDuration={400}
              currentViewIndex={currentView}
              className={"authentication__auth-window__carousel"}
              height={currentView ? 700 : 500}
            >
              <Login onCreateAccountClick={onCreateAccountClick} />
              <SignUp onBackToLoginClick={onBackToLoginClick} />
            </CarouselView>
          </div>
        </div>
      </div>
    </div>
  );
};
