import React, { useContext } from "react";
import styled from "styled-components";
import { TeamContext } from "../contexts/TeamContext";
import { Droppable } from "react-beautiful-dnd";
import Player from "./Player";

const Container = styled.div`
  min-height: 100px;
  width: 280px;
  margin-right: 10px;
  border: 2px solid grey;
  border-radius: 5px;
`;

const TeamName = styled.div`
  text-align: center;
  // border: 1px solid orange;
  padding: 5px 0 5px 0;
  > h3 {
    margin: 0;
  }
`;

const Teammates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Team(props) {
  const { teams } = useContext(TeamContext);
  const team = teams[props.id];

  return (
    <Container>
      <TeamName>
        <h3>{team.teamName}</h3>
      </TeamName>

      <Droppable droppableId={team.id + "-column"} direction="vertical">
        {provided => (
          <Teammates {...provided.droppableProps} ref={provided.innerRef}>
            {team.members.map((playerId, index) => (
              <Player id={playerId} index={index} />
            ))}
            {provided.placeholder}
          </Teammates>
        )}
      </Droppable>
    </Container>
  );
}

export default Team;
