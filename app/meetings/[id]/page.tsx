import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { loadMeetingById } from '@/lib/api-base';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await loadMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="stack">
      <div className="actions">
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
