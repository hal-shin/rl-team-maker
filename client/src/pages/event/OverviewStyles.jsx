import React from "react";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  jumbotron: props => ({
    backgroundImage: `url("${props.image}")`,
    backgroundRepeat: "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    [theme.breakpoints.up("sm")]: {
      minHeight: 300
    },
    [theme.breakpoints.up("md")]: {
      minHeight: 400
    },
    [theme.breakpoints.up("lg")]: {
      minHeight: 460
    }
  }),
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
  },
  content: {
    padding: theme.spacing(2)
  },
  sidebar: {
    padding: theme.spacing(2)
  }
}));

export function Jumbotron(props) {
  const classes = useStyles(props);
  return <div className={classes.jumbotron} />;
}
