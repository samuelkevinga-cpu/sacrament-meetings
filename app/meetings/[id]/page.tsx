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
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
