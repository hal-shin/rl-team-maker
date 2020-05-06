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

function LeftDrawer(props) {
  const classes = useStyles();
  const { handleDrawerClose, menuOpen, theme } = props;
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const { isDarkMode, toggleIsDarkMode, viewMode, setViewMode } = useContext(
    ThemeContext
  );

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
        {/*   Team Maker   */}
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Team Maker" />
        </ListItem>

        {/*   Tournament Bracket   */}
        <ListItem button>
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText primary="Tournament Bracket" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {/*   View Change Button   */}
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

        {/*   Dark Mode Button   */}
        <ListItem button onClick={toggleIsDarkMode}>
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
      </List>

      <Divider />

      <List>
        {/*   Host Button   */}
        <ListItem
          button
          onClick={() => setOpen("host")}
          key="Host"
          disabled={Boolean(session.isViewer)}
        >
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Host" />
        </ListItem>

        {/*   Join Button   */}
        {/*<ListItem*/}
        {/*  button*/}
        {/*  onClick={() => setOpen("join")}*/}
        {/*  key="Join"*/}
        {/*  disabled={session.connected}*/}
        {/*>*/}
        {/*  <ListItemIcon>*/}
        {/*    <PeopleIcon />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Join" />*/}
        {/*</ListItem>*/}

        {/*   Help Button   */}
        <ListItem button key="Help" onClick={() => setOpen("help")}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>

      {/*   Footer   */}
      <div className={classes.footer}>
        <Typography variant="overline" align="center">
          Made with <FavoriteIcon fontSize="inherit" /> by HS
        </Typography>
      </div>
    </Drawer>
  );
}

export default LeftDrawer;
