// import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, sportsData } from "@/lib/api/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`DROP TABLE IF EXISTS users`;
  await sql`
    CREATE TABLE users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return sql`
        INSERT INTO users (id, name)
        VALUES (${user.id}, ${user.name})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
};

async function seedSportsData() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`DROP TABLE IF EXISTS sports`;
  await sql`
    CREATE TABLE sports (
      id VARCHAR PRIMARY KEY,
      name TEXT NOT NULL,
      competition_id VARCHAR NOT NULL,
      competition TEXT,
      country_id VARCHAR,
      country TEXT,
      unix_timestamp BIGINT,
      live_status TEXT
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
        liveStatus,
      } = sportData;
      return sql`
        INSERT INTO sports (
          id,
          name,
          competition_id,
          competition,
          country_id,
          country,
          unix_timestamp,
          live_status
        )
        VALUES (
          ${id},
          ${name},
          ${competitionId},
          ${competition},
          ${countryId},
          ${country},
          ${timestamp},
          ${liveStatus}
        )
        ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedSportsData;
}

export async function GET() {
  try {
    await sql.begin(() => [seedUsers(), seedSportsData()]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}