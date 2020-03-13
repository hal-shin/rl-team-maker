import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TeamBoard from "./TeamBoard";
import Settings from "./Settings";

const Container = styled.div`
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px 0;
  > h1 {
    margin: 0;
  }
`;

export default function TeamSection() {
  return (
    <Container>
      <Header>
        <h1>Teams</h1>
        <Settings>
          <Button variant="contained" color="secondary">
            Reset
          </Button>
        </Settings>
      </Header>
      <TeamBoard />
    </Container>
  );
}
