import React, { useContext } from "react";
import { TeamContext } from "../contexts/TeamContext";
import Button from "@material-ui/core/Button";

export default function AddNewTeam() {
  const { teams, setTeams, teamOrder, setTeamOrder } = useContext(TeamContext);

  const handleAddNewTeam = () => {
    const newTeams = { ...teams };
    const newTeamOrder = [...teamOrder];
    const newTeamId = Object.keys(teams).length + 1;
    newTeams[`team-${newTeamId}`] = {
      id: `team-${newTeamId}`,
      teamName: `Team ${newTeamId}`,
      members: []
    };
    newTeamOrder.push(`team-${newTeamId}`);
    setTeams(newTeams);
    setTeamOrder(newTeamOrder);
  };
  return (
    <Button variant="outlined" color="primary" onClick={handleAddNewTeam}>
      Add Team
    </Button>
  );
}
