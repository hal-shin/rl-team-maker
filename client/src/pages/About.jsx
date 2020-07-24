import React from "react";
import { Typography } from "@material-ui/core";
import DefaultContainer from "../components/DefaultContainer";

export default function About() {
  return (
    <DefaultContainer header="About">
      <Typography variant="body1">
        The RL Tournament App is specifically designed to help organize Rocket
        League tournaments. Here are some of the key features to help organizers
        do their job better:
      </Typography>
      <ul>
        <li>
          <Typography>
            Automatic fetching of a player's MMR given their platform username.
          </Typography>
        </li>
        <li>
          <Typography>
            Easy balancing of teams through either an automated team sorting
            mechanism or a captain's draft.
          </Typography>
        </li>
        <li>
          <Typography>
            Simple visualization of the available teams and players
          </Typography>
        </li>
        <li>
          <Typography>
            Live hosting features -- changes to the tournament board is
            reflected automatically without refreshing the page for viewers
          </Typography>
        </li>
      </ul>
    </DefaultContainer>
  );
}
