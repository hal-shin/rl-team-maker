import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Popover, InputBase, Typography, Paper } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import { useStyles } from "./ChatStyles";
import { DialogContext } from "../../contexts";
import { socket } from "../../socket";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  joinRoom,
  setConnected,
  setRoom
} from "../../actions/chatActions";

export default function Chat() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const messagesEndRef = useRef(null);
  const { room, rooms, connected } = useSelector(state => state.chat);
  const messages = rooms[room];
  const { chatOpen, setChatOpen } = useContext(DialogContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const connectToChat = () => {
      socket.emit("connect-chat", {
        username: user["https://rl/username"],
        room
      });

      if (!connected) {
        socket.on("message", payload => {
          const { room, message } = payload;
          dispatch(addMessage({ room, message }));
        });

        dispatch(setConnected(true));
      }
    };

    const initializeRoom = () => {
      if (!rooms[room]) {
        dispatch(joinRoom(room));
        connectToChat();
      } else {
        rooms[room].connected ? setIsLoading(false) : connectToChat();
      }
    };

    if (isAuthenticated && room && chatOpen) initializeRoom();
  }, [chatOpen, room, dispatch, isAuthenticated, rooms, user, connected]);

  useEffect(() => {
    if (rooms[room]) {
      setIsLoading(false);
      scrollToBottom();
    }
  }, [chatOpen, rooms, setIsLoading, room, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleClose = () => {
    dispatch(setRoom(""));
    setIsLoading(true);
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
    dispatch(addMessage({ message: payload.message, room }));
    setMessage("");
  };

  const handleKeyPress = event => {
    if (event.key === "Enter" && message) {
      submitMessage();
    }
  };

  return (
    <Popover
      id="menu-chat"
      classes={{ paper: classes.container }}
      anchorEl={chatOpen}
      keepMounted
      open={Boolean(chatOpen)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
    >
      <div className={classes.header}>
        <Typography id="whatever" variant="h5" align="center">
          Chat Box
        </Typography>
      </div>
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
          autoFocus
          fullWidth
        />
        <Send onClick={submitMessage} />
      </Paper>
    </Popover>
  );
}
