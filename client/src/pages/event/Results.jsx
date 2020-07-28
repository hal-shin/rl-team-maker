import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

import { DefaultContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { populateScores } from "../../helpers/resultsLogic";
import { setTeams } from "../../actions/eventActions";

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 800
  }
}));

function Results() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    team: { teams },
    games
  } = useSelector(state => state.event);
  const [teamsArray, setTeamsArray] = useState([]);

  useEffect(() => {
    if (Object.keys(teams).length > 0) {
      const [newTeams, sortedTeamsArray] = populateScores(teams, games);

      dispatch(setTeams(newTeams));
      setTeamsArray(sortedTeamsArray);
    }
    // eslint-disable-next-line
  }, [games]);
  return (
    <DefaultContainer header="Results">
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="Standings table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell colSpan={4}>Teams</TableCell>
              <TableCell align="center">Wins</TableCell>
              <TableCell align="center">Losses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamsArray.map((teamId, index) => (
              <TableRow key={index}>
                <TableCell align="center" style={{ width: 100 }}>
                  {index + 1}
                </TableCell>
                <TableCell colSpan={4}>{teams[teamId].teamName}</TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {teams[teamId].score.wins}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {teams[teamId].score.losses}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultContainer>
  );
}

export default Results;
