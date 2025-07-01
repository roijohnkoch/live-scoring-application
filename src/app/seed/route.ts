// import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { sportsData } from "@/lib/api/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedSportsData() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`DROP TABLE IF EXISTS sports`;
  await sql`
    CREATE TABLE sports (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      sport_id VARCHAR(255) UNIQUE,
      name TEXT NOT NULL,
      competition_id VARCHAR NOT NULL,
      competition TEXT,
      country_id VARCHAR,
      country TEXT,
      unix_timestamp INTEGER,
      status_type TEXT,
      home_team_name VARCHAR,
      away_team_name VARCHAR,
      home_score_current INTEGER,
      away_score_current INTEGER,
      live_status TEXT,
      date VARCHAR,
      time VARCHAR
    )
  `;

  const insertedSportsData = await Promise.all(
    sportsData.map((sportData) => {
      const {
        id,
        name,
        competitionId,
        competition,
        countryId,
        country,
        timestamp,
        status,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        liveStatus,
        date,
        time,
      } = sportData;
      return sql`
        INSERT INTO sports (
          sport_id,
          name,
          competition_id,
          competition,
          country_id,
          country,
          unix_timestamp,
          status_type,
          home_team_name,
          away_team_name,
          home_score_current,
          away_score_current,
          live_status,
          date,
          time
        )
        VALUES (
          ${id},
          ${name},
          ${competitionId},
          ${competition},
          ${countryId},
          ${country},
          ${timestamp},
          ${status.type},
          ${homeTeam.name},
          ${awayTeam.name},
          ${homeScore.current || null},
          ${awayScore.current || null},
          ${liveStatus},
          ${date},
          ${time}
        )
        ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedSportsData;
}

export async function GET() {
  try {
    await sql.begin(() => [seedSportsData()]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}