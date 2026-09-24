import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
      <Image
        src="/logo.svg"
        alt="Silhouette of the Salt Lake Temple"
        width={141}
        height={200}
        priority
        className="h-auto w-36 dark:invert"
      />
      <h1 className="text-3xl font-bold">Sacrament Meeting Planner</h1>
      <p className="max-w-md text-foreground/70">
        Plan, manage, and review sacrament meeting agendas. View and print the
        program for the current and past weeks.
      </p>
      <Link
        href="/meetings"
        className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
      >
        View Meetings
      </Link>
    </div>
  );
}
