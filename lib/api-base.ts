import { headers } from 'next/headers';
import { getMeetingById, getMeetings } from './meetings-db';
import type { SacramentMeeting } from './types';

// Builds an absolute base URL so Server Components can fetch this app's
// own API routes (relative URLs are not supported by fetch on the server).
export async function getBaseUrl(): Promise<string> {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

// On Vercel, a Server Component cannot safely fetch this app's own API
// (the page and the API are separate serverless functions and can deadlock).
export async function loadMeetings(): Promise<SacramentMeeting[]> {
  if (process.env.VERCEL) {
    return getMeetings();
  }

  const res = await fetch(`${await getBaseUrl()}/api/meetings`, {
    cache: 'no-store',
  });
  if (!res.ok) return getMeetings();
  return res.json();
}

export async function loadMeetingById(
  id: string
): Promise<SacramentMeeting | null> {
  if (process.env.VERCEL) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) return null;
    return getMeetingById(numericId);
  }

  const res = await fetch(`${await getBaseUrl()}/api/meetings/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}
