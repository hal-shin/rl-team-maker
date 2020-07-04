import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import { ThemeContext } from "../../contexts";
import { useAuth0 } from "@auth0/auth0-react";

export default function AccountMenu() {
  const history = useHistory();
  const { accountMenuEl, setAccountMenuEl } = useContext(ThemeContext);
  const { user, logout } = useAuth0();

  const handleClose = () => {
    setAccountMenuEl(null);
  };

  const handleClick = menu => {
    switch (menu) {
      case "profile":
        history.push(`/profile/${user.sub.slice(6)}`);
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <Menu
      id="account-menu"
      anchorEl={accountMenuEl}
      keepMounted
      open={Boolean(accountMenuEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleClick("profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleClick("logout")}>Logout</MenuItem>
    </Menu>
  );
}
