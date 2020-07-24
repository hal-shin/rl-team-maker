import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
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
