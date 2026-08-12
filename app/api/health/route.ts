export const runtime = "nodejs";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "leadflowai-web",
      version: 1,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
