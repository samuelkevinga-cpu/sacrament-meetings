'use client';

import { useActionState } from 'react';
import { createMeeting, type ActionState } from '@/lib/actions';
import MeetingFormFields from './MeetingFormFields';

const initialState: ActionState = {};

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <MeetingFormFields state={state} />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create meeting'}
      </button>
    </form>
  );
}
