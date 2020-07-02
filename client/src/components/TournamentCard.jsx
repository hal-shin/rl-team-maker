import React, { useContext } from "react";
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
  Typography
} from "@material-ui/core";
import { Favorite, Share } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { DialogContext } from "../contexts";

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
    backgroundColor: red[500]
  }
}));

function TournamentCard({ event }) {
  const classes = useStyles();
  const { setSnackbarOpen } = useContext(DialogContext);

  const handleFavorite = () => {
    setSnackbarOpen("favorite-event")
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
          image="https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_11.jpg?t=1585155609"
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
        <CardActions>
          <IconButton onClick={handleFavorite}>
            <Favorite />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TournamentCard;
