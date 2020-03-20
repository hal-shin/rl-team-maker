import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import io from "socket.io-client";
import { SocketContext } from "../contexts/SocketContext";
import { DialogContext } from "../contexts/DialogContext";
import { Paper } from "@material-ui/core";

const username = "anonymous";

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

const ChatMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "350px",
    "& ul": {
      padding: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chatLog: {
    backgroundColor: theme.palette.background.default,
    height: "400px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    overflowX: "hidden",
    "& :first-child": {
      marginTop: "auto"
    }
  },
  message: {
    height: "auto",
    marginBottom: "6px",
    padding: "6px",
    fontSize: "16px",
    wordBreak: "break-word",
    overflow: "visible",
    "& p": {
      margin: 0
    }
  },
  input: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    "& input": {
      paddingLeft: "10px"
    },
    "& svg": {
      width: "50px",
      color: theme.palette.primary.main,
      cursor: "pointer"
    }
  }
}));

export default function Chat() {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const {
    users,
    setUsers,
    message,
    setMessage,
    messages,
    setMessages
  } = useContext(SocketContext);
  const { chatOpen, setChatOpen } = useContext(DialogContext);


  const handleClick = event => {
    setChatOpen(event.currentTarget);
  };

  const handleClose = () => {
    setChatOpen(null);
  };

  const handleInput = event => {
    setMessage(event.target.value);
  };

  const submitMessage = event => {
    event.preventDefault();
    if (message === "") return;
    socket.emit("send", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      console.log("YES!");
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = event => {
    if (message === "") return;
    if (event.charCode === 13) {
      socket.emit("send", message);
      setMessage("");
    }
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        Open Chat
      </Button>
      <ChatMenu
        id="simple-menu"
        className={classes.menu}
        anchorEl={chatOpen}
        keepMounted
        open={Boolean(chatOpen)}
        onClose={handleClose}
      >
        <Paper elevation={0} color="inherit" className={classes.header} square>
          <Typography variant="h5" align="center">
            Chat Box
          </Typography>
        </Paper>
        <Paper elevation={0} className={classes.chatLog} square>
          {messages.map((message, index) => {
            return (
              <Paper
                variant="outlined"
                className={classes.message}
                key={index}
                square
              >
                <strong>{message.user.name}: </strong>
                {message.text}
              </Paper>
            );
          })}
          <div ref={messagesEndRef} style={{ opacity: 0 }}></div>
        </Paper>
        <Paper elevation={0} className={classes.input} square>
          <InputBase
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            value={message}
            fullWidth
          />
          <SendIcon onClick={submitMessage} />
        </Paper>
      </ChatMenu>
    </div>
  );
}
