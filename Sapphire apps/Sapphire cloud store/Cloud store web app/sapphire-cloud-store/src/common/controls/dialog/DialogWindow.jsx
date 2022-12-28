import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const DialogWindow = ({
  children,
  title,
  closeBtnText,
  maxWidth,
  fullWidth,
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{closeBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
};
