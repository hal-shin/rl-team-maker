import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../initialData";
import TeamSection from "./TeamSection";
import styled from "styled-components";
import PlayerSection from "./PlayerSection";
import { ThemeContext } from "../contexts/ThemeContext";
import { PlayerContext } from "../contexts/PlayerContext";
import { TeamContext } from "../contexts/TeamContext";

const BoardStyles = styled.div`
  background: ${props => (props.isDarkMode ? "rgb(41,41,41)" : "white")};
  padding: 0 5% 0 5%;
  display: flex;
  justify-content: space-around;
`;

export default function Board() {
  const { isDarkMode } = useContext(ThemeContext);
  const { playerOrder, setPlayerOrder } = useContext(PlayerContext);
  const { teams, setTeams, teamOrder, setTeamOrder } = useContext(TeamContext);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    // Moving teams around
    if (type === "team") {
      const newTeamOrder = [...teamOrder];
      newTeamOrder.splice(source.index, 1);
      newTeamOrder.splice(destination.index, 0, draggableId);
      setTeamOrder(newTeamOrder);
      return;
    }

    // Moving players within the player list
    if (start === finish && finish === "player-column") {
      const newPlayerOrderArray = Array.from(playerOrder);
      newPlayerOrderArray.splice(source.index, 1);
      newPlayerOrderArray.splice(destination.index, 0, draggableId);
      setPlayerOrder([...newPlayerOrderArray]);
      return;
    }

    // Moving a player from player list to a team
    if (start === "player-column" && finish.includes("team")) {
      const newPlayerList = [...playerOrder];
      const newTeams = { ...teams };
      newPlayerList.splice(source.index, 1);
      newTeams[destination.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      setPlayerOrder(newPlayerList);
      setTeams(newTeams);
      return;
    }

    // Moving a player within their team
    if (start === finish && finish.includes("team")) {
      const newTeams = { ...teams };
      newTeams[source.droppableId].members.splice(source.index, 1);
      newTeams[source.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      setTeams(newTeams);
      return;
    }

    // Moving a player across teams
    if (start.includes("team") && finish.includes("team")) {
      const newTeams = { ...teams };
      newTeams[source.droppableId].members.splice(source.index, 1);
      newTeams[destination.droppableId].members.splice(
        destination.index,
        0,
        draggableId
      );
      setTeams(newTeams);
      return;
    }

    // Moving a player from a team to player list
    if (start.includes("team") && finish === "player-column") {
      const newPlayerList = [...playerOrder];
      const newTeams = { ...teams };
      newPlayerList.splice(destination.index, 0, draggableId);
      newTeams[source.droppableId].members.splice(source.index, 1);
      setPlayerOrder(newPlayerList);
      setTeams(newTeams);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardStyles isDarkMode={isDarkMode}>
        <TeamSection />
        <PlayerSection />
      </BoardStyles>
    </DragDropContext>
  );
}
