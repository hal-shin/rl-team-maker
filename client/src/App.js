import React, { useContext, useState } from "react";
import clsx from "clsx";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HelpIcon from "@material-ui/icons/Help";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { lightTheme, darkTheme, useStyles } from "./AppStyles";
import Board from "./components/Board";
import Chat from "./components/Chat";
// import ChatAvatars from "./components/ChatAvatars";
import { DialogContext } from "./contexts/DialogContext";
import { SocketContext } from "./contexts/SocketContext";
import { ThemeContext } from "./contexts/ThemeContext";
import logo from "./assets/logo.png";
import Hidden from "@material-ui/core/Hidden";

export default function App() {
  const classes = useStyles();
  const { setOpen } = useContext(DialogContext);
  const { isDarkMode, toggleIsDarkMode, viewMode, setViewMode } = useContext(
    ThemeContext
  );
  const { roomNameLive } = useContext(SocketContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setOpenPlayerContextMenu } = useContext(DialogContext);

  const theme = isDarkMode ? darkTheme : lightTheme; // must come after isDarkMode declaration

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

  const handleAltMenuOpen = () => {
    setOpen("alt-menu");
  };

  const handleMouseDown = event => {
    if (event.button === 2) {
      setOpenPlayerContextMenu({
        mouseX: null,
        mouseY: null
      });
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={classes.root}
        onContextMenu={e => e.preventDefault()}
        onMouseDown={handleMouseDown}
      >
        <CssBaseline />
        <AppBar
          variant="outlined"
          color="inherit"
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
            <img src={logo} className={classes.logo} />
            <Typography
              variant="h6"
              noWrap
              style={{ flexGrow: 1, paddingLeft: 10 }}
            >
              RL Team Maker
            </Typography>
            <Chat />
            <Hidden lgUp>
              <IconButton
                color="inherit"
                aria-label="open alt menu"
                onClick={handleAltMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            </Hidden>
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
