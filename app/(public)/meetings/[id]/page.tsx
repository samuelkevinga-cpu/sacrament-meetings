import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = Number.isInteger(numericId)
    ? await getMeetingById(numericId)
    : null;

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
