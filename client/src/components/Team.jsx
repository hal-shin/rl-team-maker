import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable } from "react-beautiful-dnd";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import Player from "./Player";
import useToggle from "../hooks/useToggleState";
import { setTeams } from "../actions/boardActions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "280px",
    margin: "0 10px 10px 0",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { width: "0 !important" },
    flexShrink: "0"
  },
  header: {
    height: "47px",
    width: "278px",
    background: theme.palette.background.paper,
    position: "relative"
  },
  collapseIcon: {
    position: "absolute",
    top: 0,
    left: 0
  },
  teamName: {
    padding: "10px 0 5px 0",
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    "& input": { width: "80% !important" }
  },
  teammates: {
    // scrolling container
    minHeight: 292,
    maxHeight: "292px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 25px 0 25px",
    msOverflowStyle: "none", // scrollbar hider - do not remove
    "&::-webkit-scrollbar": {
      display: "none" // scrollbar hider - do not remove
    }
  },
  footer: {
    height: 36
  },
  footerText: {
    fontSize: 13.5,
    fontWeight: 400,
    letterSpacing: 0.95
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

export default function Team(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const teams = useSelector(state => state.board.team.teams);
  const players = useSelector(state => state.board.player.players);
  const gameMode = useSelector(state => state.board.meta.gameMode);
  const team = teams[props.id];
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [tempTeamName, setTempTeamName] = useState(team.teamName); // must come after team variable
  const [totalMMR, setTotalMMR] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  // add up MMR of players in team
  useEffect(() => {
    const newTotalMMR = team.members.reduce((accumulator, id) => {
      return accumulator + players[id].ranks.currentSeason[gameMode];
    }, 0);
    setTotalMMR(newTotalMMR);
  }, [teams]);

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
          onClick={toggleIsEditing}
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
          <Typography component="div" variant="body2" className={classes.footerText}>
            <Box pl={2}>TOTAL: {totalMMR}</Box>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.footerText}>
            AVERAGE: {Math.round(totalMMR / team.members.length) || 0}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
