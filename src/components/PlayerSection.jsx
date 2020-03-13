import React, { useContext } from "react";
import Player from "./Player";
import { PlayerContext } from "../contexts/PlayerContext";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import AddNewPlayer from "./AddNewPlayer";

const Container = styled.div`
  width: 250px;
`;

const Header = styled.div`
  margin: 20px 0 20px 0;
  > h1 {
    margin: 0;
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
  height: calc(100vh - 160px);
  padding-top: 5px;
  transition: all 0.2s ease;
  overflow: scroll;
`;

export default function PlayerSection() {
  const { playerOrder } = useContext(PlayerContext);
  return (
    <Container>
      <Header>
        <h1>Players</h1>
        <AddNewPlayer />
      </Header>
      <Droppable droppableId="player-column">
        {(provided, snapshot) => (
          <PlayerBox
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {playerOrder.map((player, index) => (
              <Player key={player} id={player} index={index} />
            ))}
            {provided.placeholder}
          </PlayerBox>
        )}
      </Droppable>
    </Container>
  );
}
