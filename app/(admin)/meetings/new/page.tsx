import CreateMeetingForm from '@/components/CreateMeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">Create Meeting</h1>
      <CreateMeetingForm />
    </div>
  );
}
