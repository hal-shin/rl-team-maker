import React, { useContext, useEffect, useState } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { DialogContext } from "../contexts";

export default function GeneralSnackbar() {
  const { snackbarMessage } = useContext(DialogContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackbarMessage) {
      setOpen(true);
    }
  }, [snackbarMessage]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
