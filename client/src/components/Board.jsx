import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TeamSection from "./TeamSection";
import PlayerSection from "./PlayerSection";
import Dialogs from "./dialogs/Dialogs";
import { socket } from "../socket";

import { timeoutPromise } from "../helpers/playerFetchLogic";
import { setBoard, setPlayerOrder, setTeams } from "../actions/boardActions";
import { SocketContext } from "../contexts/SocketContext";
import { setSession } from "../actions/sessionActions";
import { setStore } from "../actions/storeActions";

var socketTimeout;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    padding: "0 5% 0 5%",
    [theme.breakpoints.down("xs")]: {
      padding: "0 8px 0 8px",
      justifyContent: "center"
    },
    justifyContent: "space-around",
    height: "calc(100vh - 48px)"
  },
  tabs: {
    borderRightStyle: "none",
    borderLeftStyle: "none"
  }
}));

export default function Board() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { sessionUrl } = useParams();
  const currentStore = useSelector(state => state);
  const currentBoard = useSelector(state => state.board);
  const currentSession = useSelector(state => state.session);
  const playerOrder = useSelector(state => state.board.player.playerOrder);
  const teams = useSelector(state => state.board.team.teams);
  const {
    setCurrentSessionUrl,
    currentSessionId,
    setCurrentSessionId,
    setIsViewer,
    isHost,
    setIsHost
  } = useContext(SocketContext);
  const [value, setValue] = useState(0);
  const [showing, setShowing] = useState("board");

  useEffect(() => {
    console.log("SESSION URL CHANGED");
    if (sessionUrl) {
      setShowing("loading");
      // fetch sessionID
      timeoutPromise(1000 * 10, fetch(`/session?url=${sessionUrl}`))
        .then(res => res.json())
        .then(data => {
          const newSessionId = data.sessionId;
          setCurrentSessionId(newSessionId);
          setIsViewer(data.isViewer);
          setIsHost(!data.isViewer);
          setShowing("board");
          setCurrentSessionUrl(sessionUrl);
          socket.emit("join-session", { sessionUrl, newSessionId });
        })
        .catch(err => {
          console.log(err);
          setShowing("no-session-found");
        });

      socket.on("update-store", newStore => {
        console.log("INCOMING STORE:", newStore);
        dispatch(setStore(newStore));
      });
    }
  }, [sessionUrl]);

  useEffect(() => {
    clearTimeout(socketTimeout);
    if (currentSessionId && currentSession.connected && isHost) {
      socketTimeout = setTimeout(() => {
        socket.emit("board-changed", {
          sessionUrl,
          sessionId: currentSessionId,
          newStore: currentStore
        });
      }, 2000);
    }
  }, [currentBoard]);

  const onDragEnd = result => {
    /* logic for drag-and-drop functions */
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    // Moving players within the player list
    if (start === finish && finish === "player-column") {
      const newPlayerOrderArray = [...playerOrder];
      newPlayerOrderArray.splice(source.index, 1);
      newPlayerOrderArray.splice(destination.index, 0, draggableId);
      dispatch(setPlayerOrder(newPlayerOrderArray));
      return;
    }

    // Moving a player from player list to a team
    if (start === "player-column" && finish.includes("team")) {
      const newPlayerList = [...playerOrder];
      const newTeams = { ...teams };
      newPlayerList.splice(source.index, 1);
      newTeams[destination.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      dispatch(setPlayerOrder(newPlayerList));
      dispatch(setTeams(newTeams));
      return;
    }

    // Moving a player within their team
    if (start === finish && finish.includes("team")) {
      const newTeams = { ...teams };
      newTeams[source.droppableId].members.splice(source.index, 1);
      newTeams[source.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      dispatch(setTeams(newTeams));
      return;
    }

    // Moving a player across teams
    if (start.includes("team") && finish.includes("team")) {
      const newTeams = { ...teams };
      newTeams[source.droppableId].members.splice(source.index, 1);
      newTeams[destination.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      dispatch(setTeams(newTeams));
      return;
    }

    // Moving a player from a team to player list
    if (start.includes("team") && finish === "player-column") {
      const newPlayerList = [...playerOrder];
      const newTeams = { ...teams };
      newPlayerList.splice(destination.index, 0, draggableId);
      newTeams[source.droppableId].members.splice(source.index, 1);
      dispatch(setPlayerOrder(newPlayerList));
      dispatch(setTeams(newTeams));
      return;
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderBoard = () => {
    if (showing === "board") {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Hidden smUp>
            <Paper variant="outlined" className={classes.tabs} square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                className={classes.tabs}
                centered
              >
                <Tab label="Teams" />
                <Tab label="Players" />
              </Tabs>
            </Paper>
          </Hidden>
          <Paper elevation={0} className={classes.root}>
            <Hidden smUp>
              {value === 0 ? <TeamSection /> : <PlayerSection />}
            </Hidden>
            <Hidden xsDown>
              <TeamSection />
              <PlayerSection />
            </Hidden>
            <Dialogs />
          </Paper>
        </DragDropContext>
      );
    } else if (showing === "loading") {
      return <p>Loading...</p>;
    } else if (showing === "no-session-found") {
      return <p>No session found.</p>;
    }
  };

  return renderBoard();
}
