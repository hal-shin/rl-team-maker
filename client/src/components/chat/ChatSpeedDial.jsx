import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Chat, Person } from "@material-ui/icons";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import { DialogContext } from "../../contexts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "absolute",
    right: "30px",
    bottom: "30px"
  }
}));

function ChatSpeedDial() {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  const { setChatOpen } = useContext(DialogContext);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const handleSpeedDialOpen = () => {

      setSpeedDialOpen(true);

  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleClick = event => {
    setChatOpen(event.currentTarget);
  };

  return (
    isAuthenticated && (
      <SpeedDial
        ariaLabel="Chat SpeedDial"
        className={classes.speedDial}
        icon={<Chat />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
        direction="left"
      >
        <SpeedDialAction
          tooltipTitle="General Chat"
          icon={<Person />}
          onClick={handleClick}
        />
      </SpeedDial>
    )
  );
}

export default ChatSpeedDial;
