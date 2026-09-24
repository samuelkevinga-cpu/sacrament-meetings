import { NextRequest } from 'next/server';
import { getMeetings, getMeetingsByDate } from '@/lib/meetings-db';

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  const meetings = date
    ? await getMeetingsByDate(date)
    : await getMeetings();
  return Response.json(meetings);
}
