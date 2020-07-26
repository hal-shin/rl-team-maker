import React from "react";
import { Typography } from "@material-ui/core";

import { DefaultContainer } from "../../components";

function EventNotFound() {
  return (
    <DefaultContainer header="Event not found!">
      <Typography>Unfortunately, this event does not exist.</Typography>
    </DefaultContainer>
  );
}

export default EventNotFound;
