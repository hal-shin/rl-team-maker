import React from "react";
import styled from "styled-components";
import TeamBoard from "./TeamBoard";

const Container = styled.div`
  width: 80%;
`;

export default function TeamSection() {
  return (
    <Container>
      <div className="header">
        <h1>Teams</h1>
        <TeamBoard />
      </div>
    </Container>
  );
}
