import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { EditorState, convertFromRaw } from "draft-js";
import {
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Button
} from "@material-ui/core";
import DraftEditor from "../../components/DraftEditor";
import { DefaultContainer } from "../../components";
import { DialogContext } from "../../contexts";

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
  },
  deleteButton: {
    backgroundColor: "red"
  }
}));

export default function Admin({ match: { params } }) {
  const classes = useStyles();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const { event } = useSelector(state => state);
  const { isAdmin } = event;
  const { tournamentId } = params;
  const { openMultiSnackbar } = useContext(DialogContext);
  const [draftEvent, setDraftEvent] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    if (event._id === tournamentId) {
      setDraftEvent({ ...event }); // potential cloning reference issue
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(event.description))
        )
      );
    }
  }, [event, tournamentId]);

  console.log("Event", event);

  // const handleChange = event => {
  //   setDraftEvent({ ...draftEvent, [event.target.name]: event.target.value });
  // };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleDeleteEvent = async () => {
    const confirmed = window.confirm("Are you sure? There's no going back!");

    if (confirmed) {
      try {
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`/tournament?tournamentId=${event._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (resp.ok) {
          openMultiSnackbar("Event deleted successfully.", "success");
          history.push("/");
        } else {
          openMultiSnackbar("Unable to delete event.", "error");
        }
      } catch (err) {
        console.log("Something went wrong while deleting the event:", err);
      }
    }
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
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography>
                <b>Admins</b>
              </Typography>
              {draftEvent.admins.map(admin => (
                <Typography key={admin.id}>{admin.name}</Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={8}>
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
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
            <ListItem divider>
              <ListItemText
                id="delete-event"
                primary="Delete Event"
                secondary="WARNING: Action is permanent!"
              />
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={handleDeleteEvent}
                  variant="contained"
                >
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary">
            Clear
          </Button>
        </div>
      );
    }
  };

  return (
    <DefaultContainer header="Settings">{renderContents()}</DefaultContainer>
  );
}
