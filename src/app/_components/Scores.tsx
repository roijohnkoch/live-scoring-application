import { memo } from "react";
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  gap: 16px;
`;

interface ScoresProps {
  homeScoreCurrent: number;
  awayScoreCurrent: number;
}

const Scores: React.FC<ScoresProps> = memo(({ homeScoreCurrent, awayScoreCurrent }) => {
  return (
    <Container>
      <div>
        {homeScoreCurrent ?? 0}
      </div>
      {'-'}
      <div>
        {awayScoreCurrent ?? 0}
      </div>
    </Container>
  )
});

export default Scores;