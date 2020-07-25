import React from "react";
import FavoriteEventSnackbar from "./FavoriteEventSnackbar";
import YouMustBeLoggedIn from "./YouMustBeLoggedIn";
import GeneralSnackbar from "./GeneralSnackbar";
import MultiSnackbar from "./MultiSnackbar";

export default function Snackbars() {
  return (
    <>
      <MultiSnackbar />
      <FavoriteEventSnackbar />
      <YouMustBeLoggedIn />
      <GeneralSnackbar />
    </>
  );
}
