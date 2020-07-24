import React, { useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  TextField
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

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
  contentHeader: {
    marginBottom: theme.spacing(3)
  },
  coverImage: {
    // border: "1px solid red"
  },
  list: {
    width: "100%"
  }
}));

export default function Admin({ match: { params } }) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  const { event } = useSelector(state => state);
  const { isAdmin } = event;
  const { tournamentId } = params;
  const [draftEvent, setDraftEvent] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (event._id === tournamentId) {
      setDraftEvent({ ...event }); // potential cloning reference issue
    }
  }, [event, tournamentId]);

  const handleChange = event => {
    setDraftEvent({ ...draftEvent, [event.target.name]: event.target.value });
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const renderContents = () => {
    if (!draftEvent) {
      return <Typography variant="body1">Loading....</Typography>;
    } else if (!isAdmin || !isAuthenticated) {
      return (
        <Typography variant="body1">
          You do not have permission to view this page.
        </Typography>
      );
    } else {
      return (
        <>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.contentHeader}>
              Admin
            </Typography>
          </div>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}></Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  id="event-description"
                  label="Event Description"
                  name="description"
                  variant="outlined"
                  value={draftEvent.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <List className={classes.list}>
              <ListItem divider>
                <ListItemText
                  id="event-private"
                  primary="Make Event Public"
                  secondary="Enabling this setting will make event visible to others"
                />
                <ListItemSecondaryAction>
                  <Switch checked={isPublic} onChange={handleToggle} />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
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
