import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const MEETING_TYPE_LABELS: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony Meeting',
  regular: 'Regular Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  // Append a local time so `YYYY-MM-DD` is not parsed as UTC (which can show the previous day).
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link href={`/meetings/${meeting.id}`} className="meeting-card">
      <p className="muted">{formattedDate}</p>
      <h2>{MEETING_TYPE_LABELS[meeting.meetingType]}</h2>
      <p className="muted">Presiding: {meeting.presiding}</p>
    </Link>
  );
}
