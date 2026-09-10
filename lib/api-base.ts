import { headers } from 'next/headers';

// Builds an absolute base URL so Server Components can fetch this app's
// own API routes (relative URLs are not supported by fetch on the server).
export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
