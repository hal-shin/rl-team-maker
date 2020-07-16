import {makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
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
