export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json({ error: "Online checkout is not available." }, { status: 503 });
}
