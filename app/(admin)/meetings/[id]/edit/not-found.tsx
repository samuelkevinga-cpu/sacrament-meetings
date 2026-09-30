import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-bold">Meeting not found</h1>
      <Link href="/meetings" className="mt-4 inline-block underline">
        Back to meetings
      </Link>
    </div>
  );
}
