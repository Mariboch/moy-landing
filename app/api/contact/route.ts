import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, task } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof contact !== "string" ||
      typeof task !== "string" ||
      name.length < 1 ||
      contact.length < 3 ||
      task.length < 5
    ) {
      return new Response(
        JSON.stringify({ error: "Заполните все поля" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // In production: dispatch to Resend + Telegram Bot API.
    // For now — log to server console.
    console.log("[contact]", { name, contact, task, at: new Date().toISOString() });

    // Simulate tiny latency
    await new Promise((r) => setTimeout(r, 600));

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
