import React, { useContext, useState } from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { TeamContext } from "../contexts/TeamContext";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Player from "./Player";
import useToggle from "../hooks/useToggleState";

const Container = styled.div`
  background: white;
  min-height: 378px;
  max-height: calc(100vh - 160px);
  width: 280px;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: scroll;
  flex-shrink: 0;
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
  > input {
    width: 80% !important;
  }
`;

const Teammates = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "white")};
  min-height: 292px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px 0 25px;
  transition: background-color 0.2s ease;
`;

const buttonStyles = {
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
  marginLeft: "5px",
  boxShadow: "none"
};

function Team(props) {
  const { teams, setTeams } = useContext(TeamContext);
  const team = teams[props.id];
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [tempTeamName, setTempTeamName] = useState(team.teamName);

  const handleEditTeamName = evt => {
    setTempTeamName(evt.target.value);
  };

  const handleCancelTeamName = () => {
    setTempTeamName(team.teamName);
    toggleIsEditing();
  };

  const handleSaveTeamName = () => {
    const newTeams = { ...teams };
    newTeams[props.id].teamName = tempTeamName;
    setTeams(newTeams);
    toggleIsEditing();
  };

  const renderTeamName = () => {
    if (isEditing) {
      return (
        <TeamName>
          <TextField
            id="standard-basic"
            defaultValue={team.teamName}
            onChange={handleEditTeamName}
            onBlur={handleCancelTeamName}
            autoFocus
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onMouseDown={handleCancelTeamName}
            style={buttonStyles}
          >
            X
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onMouseDown={handleSaveTeamName}
            style={buttonStyles}
          >
            ✓
          </Button>
        </TeamName>
      );
    }
    return (
      <TeamName>
        <EditIcon fontSize="small" onClick={toggleIsEditing} />
        <h3>{team.teamName}</h3>
      </TeamName>
    );
  };

  return (
    <Draggable draggableId={team.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div {...provided.dragHandleProps}>{renderTeamName()}</div>
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
      )}
    </Draggable>
  );
}

export default Team;
