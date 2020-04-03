import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Player from "./Player";
import { PlayerContext } from "../contexts/PlayerContext";
import AddNewPlayer from "./AddNewPlayer";
import { ThemeContext } from "../contexts/ThemeContext";
import { Paper } from "@material-ui/core";
import PlayerContextMenu from "./PlayerContextMenu";

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    margin: "20px 0 20px 0",
    "& h1": {
      margin: "0",
      cursor: "pointer",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none"
    },
    display: "flex",
    justifyContent: "space-between"
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
}));

const Container = styled.div`
  width: 250px;
`;

export default function PlayerSection() {
  const classes = useStyles();
  const { players, playerOrder, setPlayerOrder } = useContext(PlayerContext);
  const { gameMode } = useContext(ThemeContext);

  const handleSortPlayerList = () => {
    let newPlayerOrder = [...playerOrder];
    newPlayerOrder.sort((a, b) => {
      return (
        players[b].ranks.currentSeason[gameMode] -
        players[a].ranks.currentSeason[gameMode]
      );
    });
    setPlayerOrder(newPlayerOrder);
  };

  return (
    <Container>
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
    </Container>
  );
}
