import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? '';
  const currentPage = Math.max(Number(params?.page) || 1, 1);
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sacrament Meetings</h1>
      <MeetingSearch />
      <div className="flex flex-col gap-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
