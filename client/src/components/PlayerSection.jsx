import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Player from "./Player";
import { PlayerContext } from "../contexts/PlayerContext";
import AddNewPlayer from "./AddNewPlayer";
import { ThemeContext } from "../contexts/ThemeContext";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  playerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100px",
    height: "calc(100vh - 160px)",
    padding: "5px 8px 0 8px",
    transition: "background-color 0.2s ease",
    overflow: "scroll",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": { width: "0 !important" }
  }
}));

const Container = styled.div`
  width: 250px;
`;

const Header = styled.div`
  margin: 20px 0 20px 0;
  > h1 {
    margin: 0;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
  display: flex;
  justify-content: space-between;
`;

const PlayerBox = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "white")};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100px;
  height: calc(100vh - 160px);
  padding: 5px 8px 0 8px;
  transition: background-color 0.2s ease;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export default function PlayerSection() {
  const classes = useStyles();
  const { players, playerOrder, setPlayerOrder } = useContext(PlayerContext);
  const { gameMode } = useContext(ThemeContext);

  const handleSortPlayerList = () => {
    let newPlayerOrder = [...playerOrder];
    newPlayerOrder.sort((a, b) => {
      return players[b].ranks[gameMode] - players[a].ranks[gameMode];
    });
    setPlayerOrder(newPlayerOrder);
  };

  return (
    <Container>
      <Header>
        <h1 onClick={handleSortPlayerList}>Players ({playerOrder.length})</h1>
        <AddNewPlayer />
      </Header>
      <Droppable droppableId="player-column">
        {(provided, snapshot) => (
          <Paper
            variant="outlined"
            className={classes.playerBox}
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
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
