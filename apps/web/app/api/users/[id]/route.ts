
import { USER_DASHBOARDS } from "@/data/users";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^usr_[a-zA-Z0-9_-]+$/.test(id)) {
    return Response.json({ error: { code: "INVALID_USER_ID" } }, { status: 400 });
  }
  const data = USER_DASHBOARDS[id];
  return data
    ? Response.json({ data })
    : Response.json({ error: { code: "USER_NOT_FOUND" } }, { status: 404 });
}
