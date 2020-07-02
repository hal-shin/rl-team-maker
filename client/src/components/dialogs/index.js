import React from "react";

import AddPlayer from "./AddPlayer";
import AddPlayerManually from "./AddPlayerManually";
import AddPlayerAutomatically from "./AddPlayerAutomatically";
import AltMenu from "./AltMenu";
import BulkAddPlayers from "./BulkAddPlayers";
import PlayerInfo from "./PlayerInfo";
import Help from "./Help";
import TeamError from "./TeamError";
import Host from "./Host";
import Join from "./Join";

export {
  AddPlayerManually,
  AddPlayerAutomatically,
  AltMenu,
  BulkAddPlayers,
  PlayerInfo,
  Help,
  TeamError,
  Host,
  Join
};

export default function Index() {
  return (
    <div>
      <AltMenu />
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
