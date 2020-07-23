import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    width: "280px",
    margin: "0 10px 10px 0",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { width: "0 !important" },
    flexShrink: "0"
  },
  header: {
    height: "47px",
    width: "278px",
    background: theme.palette.background.paper,
    position: "relative"
  },
  collapseIcon: {
    position: "absolute",
    top: 0,
    left: 0
  },
  teamName: {
    padding: "10px 0 5px 0",
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    "& input": { width: "80% !important" }
  },
  teammates: {
    // scrolling container
    minHeight: 292,
    maxHeight: "292px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 25px 0 25px",
    msOverflowStyle: "none", // scrollbar hider - do not remove
    "&::-webkit-scrollbar": {
      display: "none" // scrollbar hider - do not remove
    }
  },
  footer: {
    height: 36
  },
  footerText: {
    fontSize: 13.5,
    fontWeight: 400,
    letterSpacing: 0.95
  }
}));

export const buttonStyles = {
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
  marginLeft: "5px",
  boxShadow: "none"
};