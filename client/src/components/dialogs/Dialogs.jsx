import React from "react";
import Help from "./Help";
import TeamError from "./TeamError";
import Host from "./Host";
import Join from "./Join";
import BulkAddPlayers from "./BulkAddPlayers";
import AddPlayerManually from "./AddPlayerManually";
import AddPlayerAutomatically from "./AddPlayerAutomatically";
import AddPlayer from "./AddPlayer";

export default function Dialogs() {
  return (
    <div>
      <AddPlayer />
      <AddPlayerAutomatically />
      <AddPlayerManually />
      <BulkAddPlayers />
      <Help />
      <TeamError />
      <Host />
      <Join />
    </div>
  );
}
