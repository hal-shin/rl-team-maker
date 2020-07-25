import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, Divider } from "@material-ui/core";

import DefaultContainer from "../../components/DefaultContainer";
import { Jumbotron, useStyles } from "./OverviewStyles";
import DraftRenderer from "../../components/DraftRenderer";

export default function Overview({ match: { params } }) {
  const classes = useStyles();
  const { tournamentId } = params;
  const {
    event: { _id, title, image, description, admins }
  } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tournamentId === _id) {
      setIsLoading(false);
    }
  }, [tournamentId, _id]);

  const renderContents = () => {
    if (isLoading) {
      return <Typography variant="body1">Loading...</Typography>;
    } else {
      return (
        <>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.contentHeader}>
              {title}
            </Typography>
            {/*<Button variant="contained" color="primary">*/}
            {/*  Register*/}
            {/*</Button>*/}
          </div>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <div className={classes.content}>
                <DraftRenderer editorState={description} />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.sidebar}>
                <Typography variant="h5">Admins</Typography>
                {admins.map(admin => (
                  <Typography key={admin.id}>{admin.name}</Typography>
                ))}
                <Typography variant="h5">Attendees</Typography>
                <Typography variant="h5">Sidebar</Typography>
                <Typography variant="h5">Sidebar</Typography>
              </div>
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Jumbotron image={image} />
      <DefaultContainer>{renderContents()}</DefaultContainer>
    </div>
  );
}
