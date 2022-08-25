import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { inputTypes } from "@enums";

export const TextBox = ({
  id,
  label,
  value,
  inputType,
  onChange,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onInputValueChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      style={{ marginLeft: "0", marginRight: "0" }}
      variant="outlined"
    >
      <InputLabel htmlFor={`${id}-outlined-input`}>{label}</InputLabel>
      <OutlinedInput
        id={`${id}-outlined-input`}
        type={
          inputType === inputTypes.PASSWORD
            ? showPassword
              ? inputTypes.TEXT
              : inputTypes.PASSWORD
            : inputType
        }
        value={inputValue}
        onChange={onInputValueChange}
        endAdornment={
          inputType === inputTypes.PASSWORD ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        label={label}
        {...restProps}
      />
    </FormControl>
  );
};
