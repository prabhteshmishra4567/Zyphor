export function adminApiUnavailable() {
  return Response.json(
    { error: "Admin operations are unavailable until authentication and persistent storage are configured." },
    { status: 503 },
  );
}