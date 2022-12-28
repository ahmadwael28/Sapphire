import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { messageSelector } from "../../store/selectors/SnackbarSelector";
import { clearMessage } from "../../store/actions/SnackBarActions";
import Fade from "@mui/material/Fade";
import { Alert } from "@mui/material";

export const SnackBar = ({ vertical, horizontal, ...restProps }) => {
  const [open, setOpen] = useState(false);
  const messageObj = useSelector(messageSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageObj?.message) setOpen(true);
    else setOpen(false);
  }, [messageObj]);

  const handleClearMsg = () => {
    dispatch(clearMessage());
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={messageObj?.duration || 5000}
      onClose={handleClearMsg}
      key={"app-snack-bar"}
      TransitionComponent={Fade}
      ClickAwayListenerProps={{ onClickAway: () => null }}
      {...restProps}
    >
      <Alert severity={messageObj?.type}>{messageObj?.message}</Alert>
    </Snackbar>
  );
};

SnackBar.propTypes = {
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

SnackBar.defaultProps = {
  vertical: "top",
  horizontal: "center",
};
