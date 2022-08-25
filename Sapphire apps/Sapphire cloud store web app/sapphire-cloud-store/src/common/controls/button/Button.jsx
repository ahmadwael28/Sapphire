import React from "react";
import Button from "@mui/material/Button";

export const IconLabelButton = ({
  onClick,
  label,
  StartIcon,
  EndIcon,
  variant,
  btnClassName,
  iconClassName,
  ...restProps
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Button
      className={btnClassName ? btnClassName : ""}
      variant={variant}
      startIcon={
        StartIcon ? (
          <StartIcon className={iconClassName ? iconClassName : ""} />
        ) : null
      }
      endIcon={
        EndIcon ? (
          <EndIcon className={iconClassName ? iconClassName : ""} />
        ) : null
      }
      onClick={handleClick}
      {...restProps}
    >
      {label}
    </Button>
  );
};
