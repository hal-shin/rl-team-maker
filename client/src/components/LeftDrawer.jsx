import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
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
  People,
  Help,
  Favorite,
  Create,
  Home,
  Info,
  Add,
  Subject,
  Settings
} from "@material-ui/icons";

import { ThemeContext, DialogContext, SocketContext } from "../contexts";
import { useAuth0 } from "@auth0/auth0-react";
import { useStyles, useTooltipStyles } from "./LeftDrawerStyles";
import { useDispatch, useSelector } from "react-redux";
import { setViewing } from "../actions/metaActions";

export default function LeftDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tooltipClasses = useTooltipStyles();
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
    setIsDarkMode,
    viewMode,
    setViewMode
  } = useContext(ThemeContext);
  const { isViewing } = useSelector(state => state.meta);
  const { isAdmin, phase } = useSelector(state => state.event);

  useEffect(() => {
    if (urlArray[1] !== "tournament" && isViewing) {
      dispatch(setViewing(false));
    }
  }, [urlArray, dispatch, isViewing]);

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

  const MenuItem = ({ icon, text, ...props }) => {
    return (
      <Tooltip
        placement="right"
        classes={tooltipClasses}
        title={menuOpen ? "" : text}
      >
        <ListItem button {...props}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Tooltip>
    );
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
        subheader={
          menuOpen ? <ListSubheader>Page Navigation</ListSubheader> : ""
        }
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
                onClick={() =>
                  history.push(`/tournament/${urlArray[2]}/overview`)
                }
                icon={<Subject />}
                text="Overview"
              />
              <MenuItem
                onClick={() => history.push(`/tournament/${urlArray[2]}/team`)}
                icon={<People />}
                text="Team Maker"
              />
              {(phase !== "forming" || isAdmin) && (
                <MenuItem
                  onClick={() =>
                    history.push(`/tournament/${urlArray[2]}/bracket`)
                  }
                  icon={<Grade />}
                  text="Tournament Bracket"
                />
              )}
              {isAdmin && (
                <MenuItem
                  onClick={() =>
                    history.push(`/tournament/${urlArray[2]}/admin`)
                  }
                  icon={<Settings />}
                  text="Settings"
                />
              )}
            </List>
          </>
        )}
      <Divider />
      <List
        subheader={
          menuOpen ? <ListSubheader>My Tournaments</ListSubheader> : ""
        }
      >
        {isAuthenticated && (
          <MenuItem
            onClick={() => history.push("/tournament/new")}
            icon={<Add />}
            text="New Event"
          />
        )}
        <MenuItem
          onClick={() => history.push("/tournament/sample/overview")}
          icon={<Create />}
          text="Event Sandbox"
        />
      </List>
      <Divider />
      <List subheader={menuOpen ? <ListSubheader>Visuals</ListSubheader> : ""}>
        {isViewing && (
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
        )}
        <MenuItem
          onClick={() => setIsDarkMode(!isDarkMode)}
          icon={<Brightness4 />}
          text={isDarkMode ? "Light Mode" : "Dark Mode"}
        />
      </List>
      {isViewing && (
        <>
          <Divider />
          <List
            subheader={menuOpen ? <ListSubheader>Other</ListSubheader> : ""}
          >
            <MenuItem
              onClick={() => setOpen("help")}
              disabled={Boolean(session.isViewer)}
              icon={<Help />}
              text="Help"
            />
          </List>
        </>
      )}
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
