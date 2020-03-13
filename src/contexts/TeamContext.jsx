import React, { createContext, useState } from "react";
import initialData from "../initialData";

export const TeamContext = createContext();

export function TeamProvider(props) {
  const [teams, setTeams] = useState(initialData.teams);
  const [teamOrder, setTeamOrder] = useState(initialData.teamOrder);
  const [numberOfTeams, setNumberOfTeams] = useState(2);

  return (
    <TeamContext.Provider
      value={{
        teams,
        setTeams,
        teamOrder,
        setTeamOrder,
        numberOfTeams,
        setNumberOfTeams
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
}
