import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function Snacks({ isTriggered, message, toClose }) {
  const [open, setOpen] = React.useState(isTriggered);

  useEffect(() => {
    if (isTriggered) {
      setOpen(true);
    }
  }, [isTriggered]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    toClose();
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={9000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          {/*  <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
