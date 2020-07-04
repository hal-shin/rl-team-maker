import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  makeStyles,
  withStyles,
  Tooltip,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListSubheader,
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
  Create,
  Home,
  Info,
  Add
} from "@material-ui/icons";

import { ThemeContext, DialogContext, SocketContext } from "../contexts";
import { useAuth0 } from "@auth0/auth0-react";

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: "48px",
    justifyContent: "flex-end"
  },
  header: {
    display: "flex",
    justifyContent: "center"
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

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: 14
  }
}))(Tooltip);

const MenuItem = ({ icon, text, ...props }) => {
  return (
    <StyledTooltip placement="right" title={text}>
      <ListItem button {...props}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </StyledTooltip>
  );
};

export default function LeftDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const urlArray = location.pathname.split("/");
  const { isAuthenticated } = useAuth0();
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
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: menuOpen,
        [classes.drawerClose]: !menuOpen
      })}
      variant="permanent"
      anchor="left"
      open={menuOpen}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: menuOpen,
          [classes.drawerClose]: !menuOpen
        })
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List
        subheader={menuOpen ? <ListSubheader>Navigation</ListSubheader> : ""}
      >
        <MenuItem
          onClick={() => history.push("/")}
          icon={<Home />}
          text="Home"
        />
        <MenuItem
          onClick={() => history.push("/about")}
          icon={<Info />}
          text="About"
        />
      </List>
      {urlArray.length > 2 &&
        urlArray.includes("tournament") &&
        urlArray[2] !== "new" && (
          <>
            <Divider />
            <List
              subheader={
                menuOpen ? <ListSubheader>Event Navigation</ListSubheader> : ""
              }
            >
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
          </>
        )}
      <Divider />
      <List
        subheader={menuOpen ? <ListSubheader>Tournament</ListSubheader> : ""}
      >
        {isAuthenticated && (
          <MenuItem
            onClick={() => history.push("/tournament/new")}
            icon={<Add />}
            text="New Event"
          />
        )}
        <MenuItem
          onClick={() => history.push("/tournament/sample/board")}
          icon={<Create />}
          text="Event Sandbox"
        />
      </List>
      <Divider />
      <List subheader={menuOpen ? <ListSubheader>Visuals</ListSubheader> : ""}>
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
      <List subheader={menuOpen ? <ListSubheader>Other</ListSubheader> : ""}>
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
        {menuOpen ? (
          <Typography variant="overline" align="center">
            Made with <Favorite fontSize="inherit" /> by HS
          </Typography>
        ) : (
          ""
        )}
      </div>
    </Drawer>
  );
}
