import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";
import { Chat, Person } from "@material-ui/icons";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import { DialogContext } from "../../contexts";
import { setRoom } from "../../actions/chatActions";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "fixed",
    right: "30px",
    bottom: "30px"
  }
}));

function ChatSpeedDial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const { isAuthenticated } = useAuth0();
  const { setChatOpen } = useContext(DialogContext);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const { _id, title } = useSelector(state => state.event);

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleClick = (event, room) => {
    setChatOpen(buttonRef.current);
    dispatch(setRoom(room));
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
        ref={buttonRef}
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
