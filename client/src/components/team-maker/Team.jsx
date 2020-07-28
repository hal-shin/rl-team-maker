import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import {
  TextField,
  Typography,
  Button,
  Box,
  IconButton,
  Grid,
  Paper,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import Player from "../player/Player";
import useToggle from "../../hooks/useToggleState";
import { setTeams } from "../../actions/eventActions";
import { useStyles, buttonStyles } from "./TeamStyles";

export default function Team(props) {
  const [isEditing, toggleIsEditing] = useToggle(false);
  const classes = useStyles(isEditing);
  const dispatch = useDispatch();
  const { teams } = useSelector(state => state.event.team);
  const { players } = useSelector(state => state.event.player);
  const { isAdmin } = useSelector(state => state.event);
  const team = teams[props.id];
  const [tempTeamName, setTempTeamName] = useState(team.teamName); // must come after team variable
  const [collapsed, setCollapsed] = useState(false);

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
    dispatch(setTeams(newTeams));
    toggleIsEditing();
  };

  const handleKeyPress = event => {
    if (event.charCode === 13) {
      handleSaveTeamName();
    }
  };

  const handleToggleEditing = () => {
    if (isAdmin) {
      toggleIsEditing();
    }
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
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
        <Typography
          variant="h5"
          onClick={handleToggleEditing}
          style={{ cursor: "pointer" }}
        >
          {team.teamName}
        </Typography>
      </div>
    );
  };

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.header}>
        {renderTeamName()}
        <div className={classes.collapseIcon}>
          <IconButton
            color="inherit"
            aria-label="collapse team"
            onClick={handleToggleCollapse}
          >
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>
      </div>
      {!collapsed && (
        <div>
          <Divider />
          <div>
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
                      view="condensed"
                      isCaptain={index === 0}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
      <Divider />

      <Grid
        container
        className={classes.footer}
        alignContent="center"
        justify="space-around"
      >
        <Grid item xs={6}>
          <Typography
            component="div"
            variant="body2"
            className={classes.footerText}
          >
            <Box pl={2}>TOTAL: {team.totalMMR}</Box>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.footerText}>
            AVERAGE:{" "}
            {team.members.length !== 0
              ? Math.round(team.totalMMR / team.members.length)
              : 0}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
