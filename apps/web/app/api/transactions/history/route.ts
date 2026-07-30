
export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address");
  if (!address) {
    return Response.json({ error: { code: "ADDRESS_REQUIRED" } }, { status: 400 });
  }

  return Response.json({
    data: {
      id: `history_${address}`,
      address,
      transactions: [],
      nextCursor: null
    }
  });
}
