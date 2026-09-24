'use client';

import Link from 'next/link';

export default function MeetingsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2">We could not load the meetings.</p>
      <div className="mt-4 flex gap-4">
        <button type="button" onClick={() => reset()} className="underline">
          Try Again
        </button>
        <Link href="/meetings" className="underline">
          Back to meetings
        </Link>
      </div>
    </div>
  );
}
