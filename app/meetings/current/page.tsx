import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

// Must be computed per request, not baked in at build time.
export const dynamic = 'force-dynamic';

function getUpcomingSundayIso(): string {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  // If today is Sunday, use today; otherwise jump forward to the next Sunday.
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);

  // Format from local date parts so UTC offset cannot shift the calendar day.
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const sundayDate = getUpcomingSundayIso();
  const [meeting] = getMeetings(sundayDate);

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}
