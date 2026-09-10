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
    <article className="meeting-detail">
      <header>
        <p className="muted">{formattedDate}</p>
        <h1>{MEETING_TYPE_LABELS[meeting.meetingType]}</h1>
        <p className="muted">
          Presiding: {meeting.presiding} &middot; Conducting: {meeting.conducting}
        </p>
        {meeting.stakeBusiness && <p>Stake Business</p>}
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2>Announcements</h2>
          <ul>
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Opening Hymn</h2>
        <p>
          #{meeting.openingHymn.number} &ndash; {meeting.openingHymn.title}
        </p>
      </section>

      <section>
        <h2>Opening Prayer</h2>
        <p>{meeting.openingPrayer}</p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section>
          <h2>Ward Business</h2>
          <ul>
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Sacrament Hymn</h2>
        <p>
          #{meeting.sacramentHymn.number} &ndash; {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section>
          <h2>Speakers &amp; Musical Numbers</h2>
          <ul>
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
        <h2>Closing Hymn</h2>
        <p>
          #{meeting.closingHymn.number} &ndash; {meeting.closingHymn.title}
        </p>
      </section>

      <section>
        <h2>Closing Prayer</h2>
        <p>{meeting.closingPrayer}</p>
      </section>
    </article>
  );
}
