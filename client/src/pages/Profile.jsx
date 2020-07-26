import React, { useEffect, useState } from "react";
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

export default function Profile({ match }) {
  const classes = useStyles();
  const {
    params: { userId }
  } = match;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/user?userId=${userId}`)
      .then(resp => resp.json())
      .then(data => {
        setResponse(data);
        setIsLoading(false);
      });
  }, [userId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Typography variant="h4" className={classes.contentHeader}>
          Loading
        </Typography>
      );
    } else if (!response) {
      return <Typography variant="body1">This user does not exist.</Typography>;
    } else {
      return (
        <>
          <Typography variant="h4" className={classes.contentHeader}>
            Profile - {response.email}
          </Typography>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          {renderContent()}
        </Paper>
      </Container>
    </div>
  );
}
