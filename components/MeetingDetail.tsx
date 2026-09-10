import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

const MEETING_TYPE_LABELS: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony Meeting',
  regular: 'Regular Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  // Append a local time so `YYYY-MM-DD` is not parsed as UTC (which can show the previous day).
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <article className="flex flex-col gap-6">
      <header>
        <p className="text-sm text-foreground/70">{formattedDate}</p>
        <h1 className="text-2xl font-bold">{MEETING_TYPE_LABELS[meeting.meetingType]}</h1>
        <p className="text-sm text-foreground/70">
          Presiding: {meeting.presiding} &middot; Conducting: {meeting.conducting}
        </p>
        {meeting.stakeBusiness && <p className="text-sm font-medium">Stake Business</p>}
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Announcements</h2>
          <ul className="list-inside list-disc">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">Opening Hymn</h2>
        <p>
          #{meeting.openingHymn.number} &ndash; {meeting.openingHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Opening Prayer</h2>
        <p>{meeting.openingPrayer}</p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Ward Business</h2>
          <ul className="list-inside list-disc">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">Sacrament Hymn</h2>
        <p>
          #{meeting.sacramentHymn.number} &ndash; {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Speakers &amp; Musical Numbers</h2>
          <ul className="list-inside list-disc">
            {meeting.speakers.map((item) => (
              <li key={`${item.name}-${item.type}`}>
                {item.name}
                {item.type === 'musical-number' ? ' (Musical Number)' : ''}
                {item.topic ? ` \u2013 ${item.topic}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">Closing Hymn</h2>
        <p>
          #{meeting.closingHymn.number} &ndash; {meeting.closingHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Closing Prayer</h2>
        <p>{meeting.closingPrayer}</p>
      </section>
    </article>
  );
}
