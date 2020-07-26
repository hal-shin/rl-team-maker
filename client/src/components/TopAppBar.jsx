import React, { useContext } from "react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import {
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
// import Chat from "./chat/Chat";
import { DialogContext, ThemeContext } from "../contexts";
import { useStyles } from "./TopAppBarStyles";

export default function TopAppBar() {
  const classes = useStyles();
  const { loginWithRedirect, isLoading, user } = useAuth0();
  const { setOpen } = useContext(DialogContext);
  const { handleDrawerOpen, menuOpen, setAccountMenuEl } = useContext(
    ThemeContext
  );

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
        </Typography>
        {/*<Chat />*/}

        <div className={classes.accountMenu}>
          {isLoading ? (
            ""
          ) : user ? (
            <>
              <Typography variant="body1" className={classes.centerVert}>
                Welcome, {user["https://rl/username"]}
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
