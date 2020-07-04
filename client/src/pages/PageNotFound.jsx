import React from "react";
import { makeStyles, Container, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3)
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  }
}));

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h4" className={classes.contentHeader}>
            Page Not Found
          </Typography>
          <Typography variant="body1">
            Sorry, this page does not exist!
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
