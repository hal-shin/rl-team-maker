import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid #d3d4d5",
    width: "350px",
    "& ul": {
      padding: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  },
  chatButton: {
    display: "flex"
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chatLog: {
    backgroundColor: theme.palette.background.default,
    height: "400px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    overflowX: "hidden",
    "& :first-child": {
      marginTop: "auto"
    }
  },
  message: {
    height: "auto",
    marginBottom: "6px",
    padding: "6px",
    fontSize: "16px",
    wordBreak: "break-word",
    overflow: "visible",
    "& p": {
      margin: 0
    }
  },
  input: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    "& input": {
      paddingLeft: "10px"
    },
    "& svg": {
      width: "50px",
      color: theme.palette.primary.main,
      cursor: "pointer"
    }
  },
  loading: {
    width: "100%",
    height: "100%",
    color: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
