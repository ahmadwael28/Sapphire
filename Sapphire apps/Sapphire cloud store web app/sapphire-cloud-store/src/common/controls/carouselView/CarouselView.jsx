import React from "react";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";

export const CarouselView = ({
  autoPlay,
  indicators,
  swipe,
  cycleNavigation,
  changeOnFirstRender,
  navButtonsAlwaysInvisible,
  animation,
  animationDuration,
  currentViewIndex,
  className,
  height,
  children,
  ...restProps
}) => {
  return (
    <Carousel
      autoPlay={autoPlay}
      indicators={indicators}
      swipe={swipe}
      cycleNavigation={cycleNavigation}
      changeOnFirstRender={changeOnFirstRender}
      navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
      animation={animation}
      duration={animationDuration}
      index={currentViewIndex}
      className={className}
      height={height}
      {...restProps}
    >
      {children}
    </Carousel>
  );
};

CarouselView.propTypes = {
  autoPlay: PropTypes.bool,
  indicators: PropTypes.bool,
  swipe: PropTypes.bool,
  cycleNavigation: PropTypes.bool,
  changeOnFirstRender: PropTypes.bool,
  navButtonsAlwaysInvisible: PropTypes.bool,
  animation: PropTypes.string,
  animationDuration: PropTypes.number,
  currentViewIndex: PropTypes.number,
  className: PropTypes.string,
  height: PropTypes.number,
};

CarouselView.defaultProps = {
  autoPlay: false,
  indicators: true,
  swipe: false,
  cycleNavigation: false,
  changeOnFirstRender: false,
  navButtonsAlwaysInvisible: true,
  animation: "fade",
  animationDuration: 400,
  currentViewIndex: 0,
  className: "",
  height: 400,
};
