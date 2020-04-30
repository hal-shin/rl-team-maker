import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import TeamSection from "./TeamSection";
import PlayerSection from "./PlayerSection";
import Dialogs from "./dialogs/Dialogs";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { setPlayerOrder, setTeams } from "../actions/boardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    padding: "0 5% 0 5%",
    justifyContent: "space-around",
    height: "calc(100vh - 48px)",
  },
}));

export default function Board() {
  const classes = useStyles();
  const playerOrder = useSelector((state) => state.board.player.playerOrder);
  const teams = useSelector((state) => state.board.team.teams);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    /* logic for drag-and-drop functions */
    const { destination, source, draggableId, type } = result;

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper elevation={0} className={classes.root}>
        <TeamSection />
        <PlayerSection />
        <Dialogs />
      </Paper>
    </DragDropContext>
  );
}
