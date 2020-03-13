import React, { useContext } from "react";
import Player from "./Player";
import { PlayerContext } from "../contexts/PlayerContext";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 20%;
`;

const PlayerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function PlayerSection() {
  const { playerOrder } = useContext(PlayerContext);
  console.log("Rendering Players:", playerOrder);
  return (
    <Container>
      <h1>Players</h1>
      <Droppable droppableId="player-column">
        {provided => (
          <PlayerBox {...provided.droppableProps} ref={provided.innerRef}>
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
