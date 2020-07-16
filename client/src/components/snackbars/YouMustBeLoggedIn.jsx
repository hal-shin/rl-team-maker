import React, { useContext } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { DialogContext } from "../../contexts";

export default function YouMustBeLoggedIn() {
  const { snackbarOpen, setSnackbarOpen } = useContext(DialogContext);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarOpen === "login"}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You must be logged in."
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
