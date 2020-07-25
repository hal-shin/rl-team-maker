import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { Favorite, Share } from "@material-ui/icons";

import { useStyles } from "./TournamentCardStyles";
import { DialogContext } from "../contexts";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export default function TournamentCard({ event }) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user } = useSelector(state => state);
  const { openSnackbar, setSnackbarOpen } = useContext(DialogContext);
  const liked = user && user.events.liked.includes(event._id);

  const handleFavorite = () => {
    if (isAuthenticated) {
      liked ? unlike() : like();
    } else {
      setSnackbarOpen("favorite-event");
    }
  };

  const like = async () => {
    const accessToken = await getAccessTokenSilently();

    const resp = await fetch(
      `/user/like?userId=${user._id}&eventId=${event._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await resp.json();

    if (data.success) {
      openSnackbar("Event liked!");
    }
  };

  const unlike = async () => {
    const accessToken = await getAccessTokenSilently();

    const resp = await fetch(
      `/user/unlike?userId=${user._id}&eventId=${event._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await resp.json();

    if (data.success) {
      openSnackbar("Event unliked!");
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{event.title[0]}</Avatar>}
          title={event.creator.name}
          subheader={event.status || "In Progress"}
        />
        <CardMedia
          className={classes.media}
          image={event.image}
          title="Tournament Feature Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.eventHeader}
            variant="h5"
            component="h2"
          >
            {event.title}
          </Typography>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
            sagittis risus. Duis sit amet orci ante. Aliquam at lacus fermentum,
            elementum odio in, ultrices urna.
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {new Date(event.startDate).toDateString() +
              " - " +
              new Date(event.endDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="outlined"
            onClick={() => history.push(`/tournament/${event._id}`)}
          >
            Go to Event
          </Button>
          <div>
            <IconButton>
              <Share />
            </IconButton>
            <IconButton onClick={handleFavorite}>
              <Favorite className={liked ? classes.liked : ""} />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
