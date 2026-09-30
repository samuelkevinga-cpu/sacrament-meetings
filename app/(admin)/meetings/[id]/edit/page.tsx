import { notFound } from 'next/navigation';
import EditMeetingForm from '@/components/EditMeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = Number.isInteger(numericId)
    ? await getMeetingById(numericId)
    : null;

  if (!meeting) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Meeting</h1>
      <EditMeetingForm meeting={meeting} />
    </div>
  );
}
