import { getMeetingById } from '@/lib/meetings-db';

// GET /api/meetings/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  // Assignment: 400 when `id` is not a valid number (e.g. "abc"), 404 when it is a number but missing.
  if (!Number.isInteger(numericId)) {
    return Response.json(
      { error: `Invalid id: ${id}` },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json(
      { error: `Meeting with id ${numericId} not found` },
      { status: 404 }
    );
  }

  return Response.json(meeting);
}
