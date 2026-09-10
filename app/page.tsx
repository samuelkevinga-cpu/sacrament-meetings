import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="hero">
      <Image
        src="/logo.svg"
        alt="Silhouette of the Salt Lake Temple"
        width={141}
        height={200}
        priority
        className="hero-logo"
      />
      <h1>Sacrament Meeting Planner</h1>
      <p>
        Plan, manage, and review sacrament meeting agendas. View and print the
        program for the current and past weeks.
      </p>
      <Link href="/meetings" className="button">
        View Meetings
      </Link>
    </div>
  );
}
