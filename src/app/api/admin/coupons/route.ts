import { adminApiUnavailable } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function GET() {
  return adminApiUnavailable();
}

export async function POST() {
  return adminApiUnavailable();
}
