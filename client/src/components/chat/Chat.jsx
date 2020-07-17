import React, { useContext, useEffect, useRef, useState } from "react";
import {
  withStyles,
  Menu,
  InputBase,
  Typography,
  Paper
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

import { useStyles } from "./ChatStyles";
import { DialogContext, SocketContext } from "../../contexts";
import { socket } from "../../socket";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function Chat() {
  const messagesEndRef = useRef(null);
  const classes = useStyles();
  const { setUsers, messages, setMessages, room } = useContext(SocketContext);
  const { chatOpen, setChatOpen } = useContext(DialogContext);
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!connected && isAuthenticated) {
      connectToChat();
      setConnected(true);
    }
  }, [chatOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const connectToChat = () => {
    socket.emit("connect-chat", {
      username: user["https://rl/username"],
      room
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
  };

  const handleClose = () => {
    setChatOpen(null);
  };

  const handleInput = event => {
    setMessage(event.target.value);
  };

  const submitMessage = () => {
    if (message === "") return;

    const payload = {
      message: {
        text: message,
        username: user["https://rl/username"]
      },
      room
    };

    socket.emit("sendMessage", payload);
    setMessages(messages => [...messages, payload.message]);
    setMessage("");
  };

  const handleKeyPress = event => {
    if (message === "") return;
    if (event.charCode === 13) {
      submitMessage();
    }
  };

  return (
    <ChatMenu
      id="chat-menu"
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
              <strong>{message.username}: </strong>
              {message.text}
            </Paper>
          );
        })}
        <div ref={messagesEndRef} style={{ opacity: 0 }} />
      </Paper>
      <Paper elevation={0} className={classes.input} square>
        <InputBase
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          value={message}
          fullWidth
        />
        <Send onClick={submitMessage} />
      </Paper>
    </ChatMenu>
  );
}
