import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Player from "./Player";
import useToggle from "../hooks/useToggleState";
import { TeamContext } from "../contexts/TeamContext";
import { PlayerContext } from "../contexts/PlayerContext";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "378px",
    maxHeight: "calc(100vh - 160px)",
    width: "280px",
    marginRight: "10px",
    overflow: "scroll",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { width: "0 !important" },
    flexShrink: "0"
  },
  teamName: {
    position: "sticky",
    top: "0",
    padding: "10px 0 15px 0",
    display: "flex",
    justifyContent: "center",
    "& input": { width: "80% !important" }
  },
  teammates: {
    minHeight: "292px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 25px 0 25px",
    transition: "background-color 0.2s ease"
  }
}));

const buttonStyles = {
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
  marginLeft: "5px",
  boxShadow: "none"
};

function Team(props) {
  const classes = useStyles();
  const { teams, setTeams } = useContext(TeamContext);
  const { players } = useContext(PlayerContext);
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

  const handleKeyPress = event => {
    if (event.charCode === 13) {
      handleSaveTeamName();
    }
  };

  const renderTeamName = () => {
    if (isEditing) {
      return (
        <div className={classes.teamName}>
          <TextField
            id="standard-basic"
            defaultValue={team.teamName}
            onChange={handleEditTeamName}
            onBlur={handleCancelTeamName}
            onKeyPress={handleKeyPress}
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
        </div>
      );
    }
    return (
      <div className={classes.teamName}>
        <Typography variant="h5" onClick={toggleIsEditing}>
          {team.teamName}
        </Typography>
      </div>
    );
  };

  return (
    <Draggable draggableId={team.id} index={props.index}>
      {provided => (
        <Paper
          className={classes.root}
          variant="outlined"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps}>{renderTeamName()}</div>
          <Droppable droppableId={team.id} direction="vertical">
            {(provided, snapshot) => (
              <div
                className={classes.teammates}
                {...provided.droppableProps}
                ref={provided.innerRef}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {team.members.map((playerId, index) => (
                  <Player
                    key={playerId}
                    id={playerId}
                    index={index}
                    player={players[playerId]}
                    isCaptain={index === 0}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
}

export default Team;
