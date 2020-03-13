import React, { useContext } from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { TeamContext } from "../contexts/TeamContext";
import { Droppable } from "react-beautiful-dnd";
import Player from "./Player";

const Container = styled.div`
  background: white;
  min-height: 363px;
  max-height: calc(100vh - 160px);
  width: 280px;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: scroll;
`;

const TeamName = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  text-align: center;
  padding: 10px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > h3 {
    margin: 0;
    font-size: 24px;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > svg {
    color: lightgrey;
    margin-right: 5px;
    :hover {
      color: grey;
    }
  }
`;

const Teammates = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "white")};
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 25px 0 25px;
  transition: all 0.2s ease;
`;

function Team(props) {
  const { teams } = useContext(TeamContext);
  const team = teams[props.id];

  return (
    <Container>
      <TeamName>
        <EditIcon fontSize="small" />
        <h3>{team.teamName}</h3>
      </TeamName>

      <Droppable droppableId={team.id} direction="vertical">
        {(provided, snapshot) => (
          <Teammates
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {team.members.map((playerId, index) => (
              <Player key={playerId} id={playerId} index={index} />
            ))}
            {provided.placeholder}
          </Teammates>
        )}
      </Droppable>
    </Container>
  );
}

export default Team;
