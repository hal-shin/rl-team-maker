import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import {
  makeStyles,
  Typography,
  Toolbar,
  IconButton,
  Hidden,
  AppBar,
  Button,
  Avatar
} from "@material-ui/core";
import { Menu, MoreVert } from "@material-ui/icons";

import logo from "../assets/logo.png";
import Chat from "./chat/Chat";
import { drawerWidth } from "./LeftDrawer";
import {
  SocketContext,
  DialogContext,
  ThemeContext,
  UserContext
} from "../contexts";

export const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    maxWidth: 28
  },
  header: {
    fontWeight: 400,
    flexGrow: 1,
    paddingLeft: 10
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
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: "pointer"
  },
  accountMenu: {
    display: "flex",
    "& > *": { marginLeft: theme.spacing(1) }
  },
  accountIcon: {
    display: "flex",
    alignItems: "center"
  },
  centerVert: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function TopAppBar() {
  const classes = useStyles();
  const {
    loginWithRedirect,
  } = useAuth0();
  const { session } = useContext(SocketContext);
  const { setOpen } = useContext(DialogContext);
  const { handleDrawerOpen, menuOpen, setAccountMenuEl } = useContext(
    ThemeContext
  );
  const { user } = useContext(UserContext);

  const handleAltMenuOpen = () => {
    setOpen("alt-menu");
  };

  const handleOpenAccountMenu = event => {
    setAccountMenuEl(event.currentTarget);
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
        <Typography variant="h6" noWrap className={classes.header}>
          RL Tournament App
          <span className={classes.buttonText}>{session.isHost && "LIVE"}</span>
        </Typography>
        {/*<Chat />*/}

        <div className={classes.accountMenu}>
          {user ? (
            <>
              <Typography variant="body1" className={classes.centerVert}>
                Welcome, {user.username}
              </Typography>
              <div className={classes.accountIcon}>
                <Avatar
                  alt={user.nickname}
                  className={classes.avatar}
                  onClick={handleOpenAccountMenu}
                  color="primary"
                >
                  {user.nickname[0].toUpperCase()}
                </Avatar>
              </div>
            </>
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
