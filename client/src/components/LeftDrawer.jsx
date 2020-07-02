import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  ViewAgenda,
  Brightness4,
  Grade,
  MeetingRoom,
  People,
  Help,
  Favorite,
  Home
} from "@material-ui/icons";

import { ThemeContext, DialogContext, SocketContext } from "../contexts";

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
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
  footer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "10px"
  }
}));

const MenuItem = ({ icon, text, ...props }) => {
  return (
    <ListItem button {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default function LeftDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const {
    handleDrawerClose,
    menuOpen,
    isDarkMode,
    toggleIsDarkMode,
    viewMode,
    setViewMode,
    setBoardShowing
  } = useContext(ThemeContext);

  const handleChangeViewMode = () => {
    switch (viewMode) {
      case "card":
        return setViewMode("condensed");
      case "condensed":
        return setViewMode("name");
      case "name":
        return setViewMode("card");
      default:
        return;
    }
  };

  return (
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
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <MenuItem
          onClick={() => history.push("/")}
          icon={<Home />}
          text="Home"
        />
      </List>
      <Divider />
      <List>
        <MenuItem
          onClick={() => setBoardShowing("team-maker")}
          icon={<People />}
          text="Team Maker"
        />
        <MenuItem
          onClick={() => setBoardShowing("bracket")}
          icon={<Grade />}
          text="Tournament Bracket"
          // disabled
        />
      </List>
      <Divider />
      <List>
        <MenuItem
          onClick={handleChangeViewMode}
          icon={<ViewAgenda />}
          text={
            viewMode === "card"
              ? "Condensed View"
              : viewMode === "condensed"
              ? "Name View"
              : "Card View"
          }
        />
        <MenuItem
          onClick={toggleIsDarkMode}
          icon={<Brightness4 />}
          text={isDarkMode ? "Light Mode" : "Dark Mode"}
        />
      </List>
      <Divider />
      <List>
        <MenuItem
          onClick={() => setOpen("host")}
          disabled={Boolean(session.isViewer)}
          icon={<MeetingRoom />}
          text="Host"
        />
        <MenuItem
          onClick={() => setOpen("help")}
          disabled={Boolean(session.isViewer)}
          icon={<Help />}
          text="Help"
        />
      </List>
      <div className={classes.footer}>
        <Button
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => history.push("/board")}
        >
          Sandbox
        </Button>
        <Typography variant="overline" align="center">
          Made with <Favorite fontSize="inherit" /> by HS
        </Typography>
      </div>
    </Drawer>
  );
}
