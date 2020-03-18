import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";
import { PlayerContext } from "../contexts/PlayerContext";
import { TeamContext } from "../contexts/TeamContext";
import useToggle from "../hooks/useToggleState";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 225,
    maxHeight: 312,
    marginBottom: "15px"
  },
  rankTable: {
    display: "flex",
    justifyContent: "space-around"
  },
  rank: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      margin: 0
    },
    "& h4": {
      margin: "5px"
    }
  },
  textfieldTag: {
    width: "133px",
    paddingBottom: "9px"
  }
});

const buttonStyles = {
  maxWidth: "25px",
  maxHeight: "25px",
  minWidth: "25px",
  minHeight: "25px",
  marginLeft: "5px",
  lineHeight: "1.15px",
  boxShadow: "none"
};

export default function Player(props) {
  const classes = useStyles();
  const { player, id, index } = props;
  const { players, setPlayers, playerOrder, setPlayerOrder } = useContext(
    PlayerContext
  );
  const { teams, setTeams } = useContext(TeamContext);
  const { viewMode } = useContext(ThemeContext);
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [playerTag, setPlayerTag] = useState(player.tag || player.id);

  const handleOpenSteam = () => {
    if (player.steamUrl) {
      window.open(player.steamUrl);
    }
  };

  const handleOpenTracker = () => {
    if (player.trackerUrl) {
      window.open(player.trackerUrl);
    }
  };

  const handleDelete = () => {
    const newPlayers = { ...players };
    let newPlayerOrder = [...playerOrder];
    const newTeams = { ...teams };

    delete newPlayers[id];
    for (let i = 1; i < Object.keys(newTeams).length + 1; i++) {
      if (newTeams[`team-${i}`].members.includes(id)) {
        newTeams[`team-${i}`].members = newTeams[`team-${i}`].members.filter(
          member => member !== id
        );
      }
    }
    if (newPlayerOrder.includes(id)) {
      newPlayerOrder = newPlayerOrder.filter(player => player !== id);
    }
    setPlayers(newPlayers);
    setPlayerOrder(newPlayerOrder);
    setTeams(newTeams);
  };

  const handleCancelEdit = () => {
    setPlayerTag(player.tag);
    toggleIsEditing();
  };

  const handleSavePlayerTag = () => {
    toggleIsEditing();
    const newPlayers = { ...players };
    newPlayers[id].tag = playerTag;
    setPlayers(newPlayers);
  };

  const handleEditPlayerTag = event => {
    setPlayerTag(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.charCode == 13) {
      handleSavePlayerTag();
    }
  };

  const renderPlayerName = () => {
    if (isEditing) {
      return (
        <div>
          <TextField
            id="standard-basic"
            defaultValue={player.tag}
            onChange={handleEditPlayerTag}
            onBlur={handleCancelEdit}
            className={classes.textfieldTag}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onMouseDown={handleCancelEdit}
            style={buttonStyles}
          >
            X
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onMouseDown={handleSavePlayerTag}
            style={buttonStyles}
          >
            ✓
          </Button>
        </div>
      );
    }
    return (
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        onClick={toggleIsEditing}
      >
        {player.tag}
      </Typography>
    );
  };

  const renderPlayer = () => {
    if (viewMode === "card") {
      return (
        <Draggable draggableId={id} index={index}>
          {provided => (
            <Card
              className={classes.root}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={player.icon}
                title="Contemplative Reptile"
              />
              <CardContent>
                {renderPlayerName()}
                <div className={classes.rankTable}>
                  <div className={classes.rank}>
                    <h4>Ones</h4>
                    <p>{player.ranks.ones}</p>
                  </div>
                  <div className={classes.rank}>
                    <h4>Twos</h4>
                    <p>{player.ranks.twos}</p>
                  </div>
                  <div className={classes.rank}>
                    <h4>Threes</h4>
                    <p>{player.ranks.threes}</p>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={handleOpenSteam}>
                  Steam
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleOpenTracker}
                >
                  Ranks
                </Button>
                <Button size="small" color="secondary" onClick={handleDelete}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          )}
        </Draggable>
      );
    } else if (viewMode === "condensed") {
      return (
        <Draggable draggableId={id} index={index}>
          {provided => (
            <Card
              className={classes.root}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <CardContent>{renderPlayerName()}</CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={handleOpenSteam}>
                  Steam
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleOpenTracker}
                >
                  Ranks
                </Button>
                <Button size="small" color="secondary" onClick={handleDelete}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          )}
        </Draggable>
      );
    }
  };

  return renderPlayer();
}
