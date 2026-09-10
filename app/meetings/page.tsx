import MeetingCard from '@/components/MeetingCard';
import { getBaseUrl } from '@/lib/api-base';
import type { SacramentMeeting } from '@/lib/types';

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();

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
