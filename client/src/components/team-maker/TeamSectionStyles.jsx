import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  container: {
    width: "80%",
    marginRight: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: 16
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      width: 280
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0 20px 0"
  },
  teamHeader: {
    display: "flex",
    alignContent: "center"
  },
  title: {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    margin: "0 20px 0 0"
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center"
  }
}));