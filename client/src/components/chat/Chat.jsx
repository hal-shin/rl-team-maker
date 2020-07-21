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
import { ChatContext, DialogContext } from "../../contexts";
import { socket } from "../../socket";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, joinRoom, setRoom } from "../../actions/chatActions";

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const messagesEndRef = useRef(null);
  const { room, rooms } = useSelector(state => state.chat);
  const { chatOpen, setChatOpen } = useContext(DialogContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && room && chatOpen) initializeRoom();
  }, [chatOpen, room]);

  useEffect(() => {
    if (rooms[room]) setIsLoading(false);
  }, [chatOpen, rooms, setIsLoading]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [rooms[room]]);

  const initializeRoom = () => {
    if (!rooms[room]) {
      dispatch(joinRoom(room));
      connectToChat();
    } else {
      rooms[room].connected ? setIsLoading(false) : connectToChat();
    }
  };

  const connectToChat = () => {
    socket.emit("connect-chat", {
      username: user["https://rl/username"],
      room
    });

    socket.on("message", payload => {
      addToMessages(payload.room, payload.message);
    });
  };

  const handleClose = () => {
    dispatch(setRoom(""));
    setIsLoading(true);
    setChatOpen(null);
  };

  const handleInput = event => {
    setMessage(event.target.value);
  };

  const addToMessages = (chatRoom, message) => {
    dispatch(addMessage({ message, room: chatRoom }));
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
    addToMessages(room, payload.message);
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
        {isLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          rooms[room].messages.map((message, index) => {
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
          })
        )}
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
