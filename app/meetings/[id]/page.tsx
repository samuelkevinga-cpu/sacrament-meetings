import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { getBaseUrl } from '@/lib/api-base';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();

  return (
    <div className="stack">
      <div className="actions">
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
