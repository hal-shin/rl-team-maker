import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import GradeIcon from "@material-ui/icons/Grade";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PeopleIcon from "@material-ui/icons/People";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../contexts/ThemeContext";
import { DialogContext } from "../contexts/DialogContext";
import { SocketContext } from "../contexts/SocketContext";

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
    alignItems: "flex-end",
    justifyContents: "center",
    paddingBottom: "10px",
    "& span": {
      flexGrow: 1
    }
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

export default function LeftDrawer(props) {
  const classes = useStyles();
  const { handleDrawerClose, menuOpen, theme } = props;
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const {
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
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <MenuItem
          onClick={() => setBoardShowing("team-maker")}
          icon={<PeopleIcon />}
          text="Team Maker"
        />
        <MenuItem
          onClick={() => setBoardShowing("tournament")}
          icon={<GradeIcon />}
          text="Tournament Bracket"
          // disabled
        />
      </List>
      <Divider />
      <List>
        <MenuItem
          onClick={handleChangeViewMode}
          icon={<ViewAgendaIcon />}
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
          icon={<Brightness4Icon />}
          text={isDarkMode ? "Light Mode" : "Dark Mode"}
        />
      </List>
      <Divider />
      <List>
        <MenuItem
          onClick={() => setOpen("host")}
          disabled={Boolean(session.isViewer)}
          icon={<MeetingRoomIcon />}
          text="Host"
        />
        <MenuItem
          onClick={() => setOpen("help")}
          disabled={Boolean(session.isViewer)}
          icon={<HelpIcon />}
          text="Help"
        />
      </List>
      <div className={classes.footer}>
        <Typography variant="overline" align="center">
          Made with <FavoriteIcon fontSize="inherit" /> by HS
        </Typography>
      </div>
    </Drawer>
  );
}
