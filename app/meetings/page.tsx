import MeetingCard from '@/components/MeetingCard';
import { loadMeetings } from '@/lib/api-base';

export default async function MeetingsPage() {
  const meetings = await loadMeetings();

  return (
    <div className="stack">
      <h1>Sacrament Meetings</h1>
      <div className="stack">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
