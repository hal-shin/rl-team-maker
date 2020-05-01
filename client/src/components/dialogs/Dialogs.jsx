import React from "react";
import Help from "./Help";
import TeamError from "./TeamError";
import Host from "./Host";
import Join from "./Join";
import BulkAddPlayers from "./BulkAddPlayers";
import AddPlayerManually from "./AddPlayerManually";
import AddPlayerAutomatically from "./AddPlayerAutomatically";
import AddPlayer from "./AddPlayer";
import PlayerInfo from "./PlayerInfo";

export default function Dialogs() {
  return (
    <div>
      <PlayerInfo />
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
