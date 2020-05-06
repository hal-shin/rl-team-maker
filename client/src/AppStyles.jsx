import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "./components/LeftDrawer";

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: "light"
    }
  })
);

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: "dark"
    }
  })
);

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: "48px",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
