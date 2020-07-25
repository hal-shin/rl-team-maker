import React, { useContext, useEffect, useState } from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {Close} from "@material-ui/icons";

import { DialogContext } from "../../contexts";

export default function MultiSnackbar() {
  const { multiSnackbar } = useContext(DialogContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (multiSnackbar.message) {
      setOpen(true);
    }
  }, [multiSnackbar]);

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
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={multiSnackbar.severity}
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
        >
          {multiSnackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
