import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";

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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  coverImage: {
    backgroundRepeat: "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%"
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Overview({ match: { params } }) {
  const classes = useStyles();
  const { tournamentId } = params;
  const {
    event: { _id, title, image, description }
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
            <Button variant="contained" color="primary">
              Register
            </Button>
          </div>
          <div>
            <img src={image} alt="" className={classes.coverImage} />
          </div>
          <div>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{description}</Typography>
          </div>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          {renderContents()}
        </Paper>
      </Container>
    </div>
  );
}
