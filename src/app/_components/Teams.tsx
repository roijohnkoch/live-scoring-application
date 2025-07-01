import styled from "styled-components";
import LiveSatus from "./LiveStatus";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 36px;
`;

const HomeTeamName = styled.div`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30%;
  text-align: right;
`;

const AyawTeamName = styled.div`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30%;
`;

interface TeamsProps {
  homeTeamName: string;
  awayTeamName: string;
  liveStatus: string
}

const Teams: React.FC<TeamsProps> = ({ homeTeamName, awayTeamName, liveStatus }) => {
  return (
    <Container>
      <HomeTeamName>
        {homeTeamName}
      </HomeTeamName>
      <LiveSatus liveStatus={liveStatus} />
      <AyawTeamName>
        {awayTeamName}
      </AyawTeamName>
    </Container>
  );
};

export default Teams;