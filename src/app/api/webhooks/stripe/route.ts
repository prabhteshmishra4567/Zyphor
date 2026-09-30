export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json({ error: "Stripe webhook handling is not configured." }, { status: 501 });
}
