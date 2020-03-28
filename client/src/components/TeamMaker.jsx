import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { ThemeContext } from "../contexts/ThemeContext";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Board from "./Board";
import { DialogContext } from "../contexts/DialogContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { amber, blue, indigo, orange, red } from "@material-ui/core/colors";
import Chat from "./Chat";
import { SocketContext } from "../contexts/SocketContext";
import ChatAvatars from "./ChatAvatars";

const lightTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
    type: "light"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
    type: "dark"
  }
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
  },
  footer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContents: "center",
    paddingBottom: "10px",
    "& span": {
      flexGrow: 1
    }
  }
}));

export default function TeamMaker() {
  const classes = useStyles();
  const theme = useTheme();
  const { setOpen } = useContext(DialogContext);
  const { isDarkMode, toggleIsDarkMode, viewMode, setViewMode } = useContext(
    ThemeContext
  );
  const { roomNameLive } = useContext(SocketContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleChangeViewMode = () => {
    if (viewMode === "card") {
      setViewMode("condensed");
    } else if (viewMode === "condensed") {
      setViewMode("name");
    } else if (viewMode === "name") {
      setViewMode("card");
    }
  };

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="transparent"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: menuOpen
          })}
        >
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, menuOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
              RL Team Maker
            </Typography>
            <Chat />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={menuOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={handleChangeViewMode}>
              <ListItemIcon>
                <ViewAgendaIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  viewMode === "card"
                    ? "Condensed View"
                    : viewMode === "condensed"
                    ? "Name View"
                    : "Card View"
                }
              />
            </ListItem>
            <ListItem button onClick={toggleIsDarkMode}>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem
              button
              onClick={() => setOpen("host")}
              key="Host"
              disabled
            >
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="Host" />
            </ListItem>
            <ListItem
              button
              onClick={() => setOpen("join")}
              key="Join"
              disabled={roomNameLive !== ""}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Join" />
            </ListItem>
            <ListItem button key="Help" onClick={() => setOpen("help")}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
          <div className={classes.footer}>
            <Typography variant="overline" align="center">
              Made with <FavoriteIcon fontSize="inherit" /> by HS
            </Typography>
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: menuOpen
          })}
        >
          <div className={classes.drawerHeader} />
          <Board />
        </main>
      </div>
    </MuiThemeProvider>
  );
}
