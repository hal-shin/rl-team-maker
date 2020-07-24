import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    padding: "0 5% 0 5%",
    [theme.breakpoints.down("xs")]: {
      padding: "0 8px 0 8px",
      justifyContent: "center"
    },
    justifyContent: "space-around",
    height: "calc(100vh - 48px)"
  },
  tabs: {
    borderRightStyle: "none",
    borderLeftStyle: "none"
  }
}));