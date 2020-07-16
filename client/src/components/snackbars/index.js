import React from "react";
import FavoriteEventSnackbar from "./FavoriteEventSnackbar";
import YouMustBeLoggedIn from "./YouMustBeLoggedIn";

export default function Snackbars() {
  return (
    <>
      <FavoriteEventSnackbar />
      <YouMustBeLoggedIn />
    </>
  );
}
