import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { setTeams, setTeamOrder } from "../../actions/eventActions";

export default function AddNewTeam() {
  const dispatch = useDispatch();
  const { teams, teamOrder } = useSelector((state) => state.event.team);

  const handleAddNewTeam = () => {
    const newTeams = { ...teams };
    const newTeamOrder = [...teamOrder];
    const newTeamId = Object.keys(teams).length + 1;
    newTeams[`team-${newTeamId}`] = {
      id: `team-${newTeamId}`,
      teamName: `Team ${newTeamId}`,
      members: [],
    };
    newTeamOrder.push(`team-${newTeamId}`);
    dispatch(setTeams(newTeams));
    dispatch(setTeamOrder(newTeamOrder));
  };
  return (
    <Button variant="outlined" color="primary" onClick={handleAddNewTeam}>
      Add Team
    </Button>
  );
}
