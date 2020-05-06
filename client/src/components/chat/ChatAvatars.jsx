import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../../contexts/SocketContext";

const useStyles = makeStyles(theme => ({
  primary: {
    color: "white",
    backgroundColor: theme.palette.primary.main
  }
}));

export default function ChatAvatars() {
  const classes = useStyles();
  const { users } = useContext(SocketContext);

  return (
    <AvatarGroup max={3}>
      {Object.keys(users).map(user => {
        return (
          <Avatar
            key={user.name}
            alt={user.name}
            src=""
            className={classes.primary}
          />
        );
      })}
    </AvatarGroup>
  );
}
