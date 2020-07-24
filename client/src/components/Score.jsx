import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, InputBase, TableCell } from "@material-ui/core";

import { setScore } from "../actions/eventActions";

const useStyles = makeStyles(theme => ({
  scoreCell: {
    width: 52,
    cursor: "pointer",
    "&:hover": {
      background:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700]
    }
  },
  input: {
    width: 20,
    padding: 0,
    margin: 0,
    height: 10,
    fontSize: "0.875rem",
    fontWeight: 600
  }
}));

function Score({ gameId, side, score }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputScore, setInputScore] = useState(score || "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (inputScore !== score) {
      dispatch(setScore(gameId, side, inputScore));
    }
    setIsEditing(false);
  };

  const handleChange = event => {
    if (
      event.target.value.length < 3 &&
      (Boolean(Number(event.target.value)) || event.target.value === "")
    ) {
      setInputScore(event.target.value);
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <TableCell onClick={handleEdit} className={classes.scoreCell}>
      {isEditing ? (
        <InputBase
          className={classes.input}
          value={inputScore}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <b>{score}</b>
      )}
    </TableCell>
  );
}

export default Score;
