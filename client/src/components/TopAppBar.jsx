import React, { useContext } from "react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import {
  makeStyles,
  Typography,
  Toolbar,
  IconButton,
  Hidden,
  AppBar,
  Button
} from "@material-ui/core";
import { Menu, MoreVert } from "@material-ui/icons";

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

export default function TopAppBar() {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const { boardShowing, handleDrawerOpen, menuOpen } = useContext(ThemeContext);

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
          <Menu />
        </IconButton>
        <img src={logo} alt="application logo" className={classes.logo} />
        <Typography
          variant="h6"
          noWrap
          style={{ flexGrow: 1, paddingLeft: 10 }}
        >
          {boardShowing === "bracket" ? "Tournament Bracket" : "Team Maker"}{" "}
          <span className={classes.buttonText}>{session.isHost && "LIVE"}</span>
        </Typography>
        <Chat />
        <div>
          {isAuthenticated ? (
            <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>Login/Signup</Button>
          )}
        </div>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            aria-label="open alt menu"
            onClick={handleAltMenuOpen}
          >
            <MoreVert />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
