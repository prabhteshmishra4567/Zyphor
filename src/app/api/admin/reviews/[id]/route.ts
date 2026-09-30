import { adminApiUnavailable } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function GET() {
  return adminApiUnavailable();
}

export async function PUT() {
  return adminApiUnavailable();
}

export async function DELETE() {
  return adminApiUnavailable();
}
