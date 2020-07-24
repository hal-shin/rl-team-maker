import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, InputBase, TableCell } from "@material-ui/core";
import { setNotes } from "../actions/eventActions";

const useStyles = makeStyles(theme => ({
  cell: {
    width: 139,
    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      background:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700]
    }
  },
  input: {
    width: 107,
    padding: 0,
    margin: 0,
    height: 10,
    fontSize: "0.875rem"
  }
}));

function Notes({ gameId, notes }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputNotes, setInputNotes] = useState(notes || "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (inputNotes !== notes) {
      dispatch(setNotes(gameId, inputNotes));
    }
    setIsEditing(false);
  };

  const handleChange = event => {
    setInputNotes(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <TableCell onClick={handleEdit} className={classes.cell}>
      {isEditing ? (
        <InputBase
          className={classes.input}
          value={inputNotes}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <>{notes}</>
      )}
    </TableCell>
  );
}

export default Notes;
