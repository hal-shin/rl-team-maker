import React, { useState, useContext, useEffect } from "react";
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
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import { Favorite, Share } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import { DialogContext, UserContext } from "../contexts";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(theme => ({
  gridItem: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  cardContent: {
    paddingBottom: 0,
    "& > :not(:first-child)": {
      marginTop: theme.spacing(1)
    }
  },
  eventHeader: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 245
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2)
  },
  liked: {
    color: red[500]
  }
}));

export default function TournamentCard({ event }) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user, fetchUser } = useContext(UserContext);
  const { setSnackbarOpen } = useContext(DialogContext);
  const liked = user && user.events.liked.includes(event.id.toString());

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
      `/user/like?userId=${user._id}&eventId=${event.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await resp.json();

    if (data.success) fetchUser();
  };

  const unlike = async () => {
    const accessToken = await getAccessTokenSilently();

    const resp = await fetch(
      `/user/unlike?userId=${user._id}&eventId=${event.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await resp.json();

    if (data.success) fetchUser();
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={<Avatar className={classes.avatar}>R</Avatar>}
          title={event.host}
          subheader={event.status}
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
            {event.startDate.toDateString() +
              " - " +
              event.endDate.toDateString()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="outlined"
            onClick={() => history.push(`/tournament/${event.id}`)}
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
