import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Chat, Person } from "@material-ui/icons";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import { DialogContext, SocketContext } from "../../contexts";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

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
  const { setRoom } = useContext(SocketContext);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const { _id, title } = useSelector(state => state.event);

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleClick = (event, room) => {
    setChatOpen(event.currentTarget);
    setRoom(room);
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
          onClick={event => handleClick(event, "general")}
        />
        {_id && title && (
          <SpeedDialAction
            tooltipTitle={`${title} General Chat`}
            icon={<Person />}
            onClick={event => handleClick(event, _id)}
          />
        )}
      </SpeedDial>
    )
  );
}

export default ChatSpeedDial;
