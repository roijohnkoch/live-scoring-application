import { Sport } from "@/lib/api/types";

interface LiveScoringProps {
  sports: Sport[]
}

const LiveScoring: React.FC<LiveScoringProps> = ({
  sports
}) => {
  return (
    <>
      <div>Live Scoring Application: {sports.length} games</div>
      {sports.map((sport) => (
        <div key={sport.id}>{sport.name}</div>
      ))}
    </>
  )
};

export default LiveScoring;