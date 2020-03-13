import React, { useContext } from "react";
import { TeamContext } from "../contexts/TeamContext";
import styled from "styled-components";
import Team from "./Team";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  overflow: scroll;
`;

export default function TeamBoard() {
  const { teamOrder } = useContext(TeamContext);

  return (
    <Droppable droppableId="team-board" type="team" direction="horizontal">
      {provided => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {teamOrder.map(team => (
            <Team key={team} id={team} />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}
