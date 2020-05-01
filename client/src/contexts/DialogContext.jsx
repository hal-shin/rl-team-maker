import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider(props) {
  const [open, setOpen] = useState("player-info");
  const [loading, setLoading] = useState("loading"); // only options are "loading" and "error"
  const [chatOpen, setChatOpen] = useState(null);
  const [openPlayerContextMenu, setOpenPlayerContextMenu] = useState({
    mouseX: null,
    mouseY: null
  });
  const [fetchedPlayer, setFetchedPlayer] = useState({});
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({
    id: "thewarriorofblue",
    platform: "steam",
    steamProfile: "https://steamcommunity.com/id/thewarriorofblue",
    trackerProfile:
      "https://rocketleague.tracker.network/profile/steam/thewarriorofblue",
    success: true,
    tag: "TheWarriorOfBlue",
    icon:
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e8/e849ef2a16c58c095a0434d6c48b2740e42e3579_full.jpg",
    ranks: {
      currentSeason: { ones: 1102, twos: 1566, threes: 1514 },
      lastSeason: { ones: 1117, twos: 1733, threes: 1804 }
    },
    verified: true
  }); // check usage of this

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        loading,
        setLoading,
        chatOpen,
        setChatOpen,
        fetchedPlayer,
        setFetchedPlayer,
        openPlayerContextMenu,
        setOpenPlayerContextMenu,
        currentPlayerInfo,
        setCurrentPlayerContext: setCurrentPlayerInfo
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}
