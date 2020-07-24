import React from "react";
import FavoriteEventSnackbar from "./FavoriteEventSnackbar";
import YouMustBeLoggedIn from "./YouMustBeLoggedIn";
import GeneralSnackbar from "../../hooks/useSnackbar";

export default function Snackbars() {
  return (
    <>
      <FavoriteEventSnackbar />
      <YouMustBeLoggedIn />
      <GeneralSnackbar />
    </>
  );
}
