import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const { isDarkMode, toggleIsDarkMode } = useContext(ThemeContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" color={isDarkMode ? "primary" : "default"}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
          <Switch
            checked={isDarkMode}
            onChange={toggleIsDarkMode}
            aria-label="Dark Mode"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
