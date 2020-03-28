import React, { useContext } from "react";
import { TeamContext } from "../contexts/TeamContext";
import styled from "styled-components";
import Team from "./Team";

const Container = styled.div`
  height: calc(100% - 110px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  -ms-overflow-style: none;
`;

export default function TeamBoard() {
  const { teamOrder } = useContext(TeamContext);

  return (
    <Container>
      {teamOrder.map(team => (
        <Team key={team} id={team} />
      ))}
    </Container>
  );
}
