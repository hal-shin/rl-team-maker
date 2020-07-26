import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

import { DefaultContainer } from "../../components";
import { useSelector } from "react-redux";
import { populateScores } from "../../helpers/resultsLogic";

function Results() {
  const {
    team: { teams },
    games
  } = useSelector(state => state.event);

  useEffect(() => {
    populateScores(teams, games);
  }, [teams, games]);
  return (
    <DefaultContainer header="Results">
      <Typography variant="h5">Standings</Typography>
    </DefaultContainer>
  );
}

export default Results;
