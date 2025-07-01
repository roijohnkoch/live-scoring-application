import postgres from "postgres";
import { Sport } from "@/lib/api/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const data = await sql`SELECT * FROM sports`;
    const formattedData: Sport[] = data.map((res) => {
      return {
        id: res.id,
        name: res.name,
        competitionId: res.competition_id,
        competition: res.competition,
        countryId: res.country_id,
        country: res.country,
        timestamp: res.unix_timestamp,
        homeTeam: {
          name: res.home_team_name,
        },
        awayTeam: {
          name: res.away_team_name,
        },
        homeScore: {
          current: res.home_score_current,
        },
        awayScore: {
          current: res.away_score_current,
        },
        status: {
          type: res.status_type
        },
        liveStatus: res.live_status,
        date: res.date,
        time: res.time,
      }
    });
    return new Response(JSON.stringify(formattedData), { status: 200  });
  } catch (error) {
    throw new Error('Failed to fetch sports data.');
  }
}