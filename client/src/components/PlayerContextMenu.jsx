import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { DialogContext } from "../contexts/DialogContext";
import { PlayerContext } from "../contexts/PlayerContext";
import { TeamContext } from "../contexts/TeamContext";

const initialState = {
  mouseX: null,
  mouseY: null
};

export default function PlayerContextMenu() {
  const {
    setOpen,
    openPlayerContextMenu,
    setOpenPlayerContextMenu,
    currentPlayerContext
  } = useContext(DialogContext);
  const { players, setPlayers, playerOrder, setPlayerOrder } = useContext(
    PlayerContext
  );
  const { teams, setTeams } = useContext(TeamContext);

  const handleClose = () => {
    setOpenPlayerContextMenu(initialState);
  };

  const handleInfo = () => {
    handleClose();
    setOpen("player-info");
  };

  const handleDelete = () => {
    const id = currentPlayerContext.id;
    const newPlayers = { ...players };
    let newPlayerOrder = [...playerOrder];
    const newTeams = { ...teams };

    delete newPlayers[id];
    for (let i = 1; i < Object.keys(newTeams).length + 1; i++) {
      if (newTeams[`team-${i}`].members.includes(id)) {
        newTeams[`team-${i}`].members = newTeams[`team-${i}`].members.filter(
          member => member !== id
        );
      }
    }
    if (newPlayerOrder.includes(id)) {
      newPlayerOrder = newPlayerOrder.filter(player => player !== id);
    }
    setPlayers(newPlayers);
    setPlayerOrder(newPlayerOrder);
    setTeams(newTeams);
    handleClose();
  };

  return (
    <div>
      <Menu
        keepMounted
        id="player-context-menu"
        open={openPlayerContextMenu.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openPlayerContextMenu.mouseY !== null &&
          openPlayerContextMenu.mouseX !== null
            ? {
                top: openPlayerContextMenu.mouseY,
                left: openPlayerContextMenu.mouseX
              }
            : undefined
        }
      >
        <MenuItem onClick={handleInfo}>Info</MenuItem>
        <MenuItem color="secondary" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
