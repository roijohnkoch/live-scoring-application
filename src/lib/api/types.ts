interface Sport {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  countryId: string;
  country: string;
  timestamp: number;
  date: string;
  time: string;
  status: Status,
  // round:{
  //   round: number;
  // },
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  liveStatus: string;
}

interface Status {
  code?: number;
  type: "inprogress" | "notstarted" | "finished";
}

interface Team {
  id?: number;
  name: string;
  slug?: string;
  gender?: string;
  subTeams?: string[];
}

interface Score {
  current: number;
  period1?: number;
  normaltime?: number;
}

export type { Sport, Status, Team, Score };