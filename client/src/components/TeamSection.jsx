import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import TeamBoard from "./TeamBoard";
import Settings from "./Settings";
import AddNewTeam from "./AddNewTeam";
import { TeamContext } from "../contexts/TeamContext";

const Container = styled.div`
  width: 80%;
  margin-right: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px 0;
`;

const TeamHeader = styled.div`
  display: flex;
  align-content: center;
  > h1 {
    margin: 0 20px 0 0;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

const useStyles = makeStyles(theme => {

})

export default function TeamSection() {
  const classes = useStyles();
  const { teams } = useContext(TeamContext);
  return (
    <Container>
      <Header>
        <TeamHeader>
          <h1>Teams ({Object.keys(teams).length})</h1>
          <ButtonDiv>
            <AddNewTeam />
          </ButtonDiv>
        </TeamHeader>
        <Settings />
      </Header>
      <TeamBoard />
    </Container>
  );
}
