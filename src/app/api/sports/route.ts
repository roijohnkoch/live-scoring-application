import postgres from "postgres";
import { Sport } from "@/lib/api/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const data = await sql`SELECT * FROM sports`;
    return new Response(JSON.stringify(data), { status: 200  });
  } catch (error) {
    throw new Error('Failed to fetch sports data.');
  }
}