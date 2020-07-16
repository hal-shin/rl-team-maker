import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";

import { Player, PlayerContextMenu } from "../player";
import { setPlayerOrder } from "../../actions/eventActions";
import { DialogContext } from "../../contexts";

const useStyles = makeStyles({
  container: {
    minWidth: "250px"
  },
  header: {
    margin: "20px 0 20px 0",
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    margin: "0",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
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
    "&::-webkit-scrollbar": { width: "0 !important" }
  }
});

export default function PlayerSection() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.event.player);
  const gameMode = useSelector(state => state.event.meta.gameMode);
  const { isAdmin } = useSelector(state => state.event);
  const { setOpen } = useContext(DialogContext);

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
        <Typography
          variant="h4"
          className={classes.title}
          onClick={handleSortPlayerList}
        >
          Players ({playerOrder.length})
        </Typography>
        {isAdmin && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen("add-player")}
          >
            New
          </Button>
        )}
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
