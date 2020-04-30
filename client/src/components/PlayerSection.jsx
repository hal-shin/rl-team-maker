import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import Player from "./Player";
import AddNewPlayer from "./AddNewPlayer";
import PlayerContextMenu from "./PlayerContextMenu";
import { setPlayerOrder } from "../actions/boardActions";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "250px",
  },
  header: {
    margin: "20px 0 20px 0",
    "& h1": {
      margin: "0",
      cursor: "pointer",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  playerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100px",
    height: "calc(100vh - 160px)",
    padding: "5px 8px 0 8px",
    overflow: "scroll",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { width: "0 !important" },
  },
}));

export default function PlayerSection() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector((state) => state.board.player);
  const gameMode = useSelector((state) => state.board.meta.gameMode);

  const handleSortPlayerList = () => {
    let newPlayerOrder = [...playerOrder];
    newPlayerOrder.sort((a, b) => {
      return (
        players[b].ranks.currentSeason[gameMode] -
        players[a].ranks.currentSeason[gameMode]
      );
    });
    dispatch(setPlayerOrder(newPlayerOrder));
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 onClick={handleSortPlayerList}>Players ({playerOrder.length})</h1>
        <AddNewPlayer />
      </div>
      <PlayerContextMenu />
      <Droppable droppableId="player-column">
        {(provided, snapshot) => (
          <Paper
            variant="outlined"
            className={classes.playerBox}
            {...provided.droppableProps}
            ref={provided.innerRef}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {playerOrder.map((player, index) => (
              <Player
                key={player}
                id={player}
                player={players[player]}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
    </div>
  );
}
