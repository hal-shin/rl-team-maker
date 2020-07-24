import React from "react";
import { Typography } from "@material-ui/core";
import DefaultContainer from "../components/DefaultContainer";

export default function PageNotFound() {
  return (
    <DefaultContainer header="Page Not Found">
      <Typography variant="body1">Sorry, this page does not exist!</Typography>
    </DefaultContainer>
  );
}
