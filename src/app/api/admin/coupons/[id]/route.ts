export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ id: "mock-coupon-id" });
}

export async function PUT() {
  return Response.json({ success: true });
}

export async function DELETE() {
  return Response.json({ success: true });
}
