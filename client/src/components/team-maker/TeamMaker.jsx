import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { makeStyles, Hidden, Paper, Tabs, Tab } from "@material-ui/core";
import TeamSection from "./TeamSection";
import PlayerSection from "./PlayerSection";
import { setPlayerOrder, setTeams } from "../../actions/eventActions";

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

export default function TeamMaker() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { playerOrder, players } = useSelector(state => state.event.player);
  const { teams } = useSelector(state => state.event.team);
  const { gameMode } = useSelector(state => state.event.meta);

  const [value, setValue] = useState(0);

  const calculateTotalMMR = members => {
    let output = 0;
    members.forEach(member => {
      output += players[member].ranks.currentSeason[gameMode];
    });

    return output;
  };

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

      newTeams[destination.droppableId].totalMMR = calculateTotalMMR(
        newTeams[destination.droppableId].members
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

      newTeams[source.droppableId].totalMMR = calculateTotalMMR(
        newTeams[source.droppableId].members
      );

      newTeams[destination.droppableId].totalMMR = calculateTotalMMR(
        newTeams[destination.droppableId].members
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
      </Paper>
    </DragDropContext>
  );
}
