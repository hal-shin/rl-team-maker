import React from "react";
import Help from "./Help";
import TeamError from "./TeamError";
import Host from "./Host";
import Join from "./Join";

function Dialogs() {
  return (
    <div>
      <Help />
      <TeamError />
      <Host />
      <Join />
    </div>
  );
}

export default Dialogs;
