// This website currently host the db used from "discussions" on Supabase
// Because I use SUpabase free plan, this project will be paused after 7 days if unused
// This file is created to automate a simple query on Supabase useing a Cron Job

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
