// This website currently hosts the database for "discussions" on Supabase.
// Supabase's free plan pauses inactive projects after 7 days.
// This route runs a simple query as a keep-alive mechanism using a Cron Job.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Simple GET request to prevent Supabase from pausing the database
export async function GET() {
  try {
    await prisma.comment.findFirst(); // returns the first comment or null

    return new Response(JSON.stringify({ message: "Keep-alive success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Keepalive route error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
