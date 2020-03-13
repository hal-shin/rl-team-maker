import React, { useContext } from "react";
import { TeamContext } from "../contexts/TeamContext";
import styled from "styled-components";
import Team from "./Team";

const Container = styled.div`
  display: flex;
`;

export default function TeamBoard(props) {
  const { teamOrder } = useContext(TeamContext);

  return (
    <Container>
      {teamOrder.map(team => (
        <Team key={team} id={team} />
      ))}
    </Container>
  );
}
