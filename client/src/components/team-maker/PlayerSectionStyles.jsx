import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    minWidth: "250px"
  },
  header: {
    margin: "20px 0 20px 0",
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    margin: "0",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  },
  playerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100px",
    height: "calc(100vh - 160px)",
    padding: "5px 8px 0 8px",
    overflow: "scroll",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { width: "0 !important" }
  }
});