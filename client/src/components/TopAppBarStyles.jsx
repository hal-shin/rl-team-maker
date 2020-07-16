import {makeStyles} from "@material-ui/core";
import {drawerWidth} from "./LeftDrawerStyles";

export const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    borderTopStyle: "none",
    borderLeftStyle: "none",
    borderRightStyle: "none"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    maxWidth: 28
  },
  header: {
    fontWeight: 400,
    flexGrow: 1,
    paddingLeft: 10
  },
  buttonText: {
    ...theme.typography.button,
    color: "red"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: "pointer"
  },
  accountMenu: {
    display: "flex",
    "& > *": { marginLeft: theme.spacing(1) }
  },
  accountIcon: {
    display: "flex",
    alignItems: "center"
  },
  centerVert: {
    display: "flex",
    alignItems: "center"
  }
}));