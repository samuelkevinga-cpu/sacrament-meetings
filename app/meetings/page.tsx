import MeetingCard from '@/components/MeetingCard';
import { loadMeetings } from '@/lib/api-base';

export default async function MeetingsPage() {
  const meetings = await loadMeetings();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sacrament Meetings</h1>
      <div className="flex flex-col gap-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
