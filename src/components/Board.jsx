import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../initialData";
import TeamSection from "./TeamSection";
import styled from "styled-components";
import PlayerSection from "./PlayerSection";
import { ThemeContext } from "../contexts/ThemeContext";
import { PlayerContext } from "../contexts/PlayerContext";

const BoardStyles = styled.div`
  background: ${props => (props.isDarkMode ? "rgb(41,41,41)" : "white")};
  padding: 0 5% 0 5%;
  display: flex;
  justify-content: space-around;
`;

export default function Board() {
  const { isDarkMode } = useContext(ThemeContext);
  const { playerOrder, setPlayerOrder } = useContext(PlayerContext);
  console.log("IS DARK MODE: ", isDarkMode);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const start = source.droppableId;
    const finish = destination.droppableId;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (start === finish && finish === "player-column") {
      console.log("Same column transfer.");
      const newPlayerOrderArray = Array.from(playerOrder);
      newPlayerOrderArray.splice(source.index, 1);
      newPlayerOrderArray.splice(destination.index, 0, draggableId);
      setPlayerOrder([...newPlayerOrderArray]);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardStyles isDarkMode={isDarkMode}>
        <TeamSection teams={initialData.teams} />
        <PlayerSection data={initialData} />
      </BoardStyles>
    </DragDropContext>
  );
}
