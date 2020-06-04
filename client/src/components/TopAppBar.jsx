import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppBar from "@material-ui/core/AppBar";

import logo from "../assets/logo.png";
import Chat from "./chat/Chat";
import { drawerWidth } from "./LeftDrawer";
import { SocketContext } from "../contexts/SocketContext";
import { DialogContext } from "../contexts/DialogContext";
import { ThemeContext } from "../contexts/ThemeContext";

export const useStyles = makeStyles(theme => ({
  appBar: {
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
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    maxWidth: 28
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
  }
}));

function TopAppBar(props) {
  const classes = useStyles();
  const { handleDrawerOpen, menuOpen } = props;
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const { boardShowing } = useContext(ThemeContext);

  const handleAltMenuOpen = () => {
    setOpen("alt-menu");
  };

  return (
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
        <img src={logo} alt="application logo" className={classes.logo} />
        <Typography
          variant="h6"
          noWrap
          style={{ flexGrow: 1, paddingLeft: 10 }}
        >
          {boardShowing === "tournament" ? "Tournament Bracket" : "Team Maker"}{" "}
          <span className={classes.buttonText}>{session.isHost && "LIVE"}</span>
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
  );
}

export default TopAppBar;
