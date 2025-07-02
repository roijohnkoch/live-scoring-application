import { Sport } from "@/lib/api/types";
import styled from "styled-components";
import Scores from "./Scores";
import Teams from "./Teams";
import { formatCustomDateTime } from "@/lib/utils";

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  max-width: calc(100% - 24px);
  justify-content: center;
  margin-top: 16px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3D3D3D;
  color: #fff;
  align-items: center;
  width: 500px;
  padding: 24px 0;
`;

const Status = styled.div<{ type: string }>`
  text-transform: uppercase;
  color: ${((props) => {
    switch (props.type) {
      case 'canceled':
        return '#DE6E7C';
      case 'finished':
        return '#44DB5E';
      case 'inprogress':
        return '#DECB22';
      default:
        return '#DEDEDE';
    }
  })};
`;

interface LiveScoringProps {
  sports: Sport[]
}

const LiveScoring: React.FC<LiveScoringProps> = ({
  sports
}) => {
  const displayStatusText = (statusType: string, date: string, time: string) => {
    switch (statusType) {
      case 'canceled':
        return 'Canceled';
      case 'inprogress':
        return 'Live';
      case 'notstarted':
        return formatCustomDateTime(date, time);
      case 'finished':
        return 'Ended';
      default:
        return;
    }
  }
  return (
    <Container>
      {sports.map((sport) => (
        <Details key={sport.id}>
          <div>{sport.country}</div>
          <div>{sport.competition}</div>
          <Status type={sport.status.type}>{displayStatusText(sport.status.type, sport.date, sport.time)}</Status>
          <Scores 
            homeScoreCurrent={sport.homeScore.current}
            awayScoreCurrent={sport.awayScore.current}
          />
          <Teams
            homeTeamName={sport.homeTeam.name}
            awayTeamName={sport.awayTeam.name}
            liveStatus={sport.liveStatus}
          />
        </Details>
      ))}
    </Container>
  )
};

export default LiveScoring;