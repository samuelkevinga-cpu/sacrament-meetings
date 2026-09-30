'use client';

import { useActionState } from 'react';
import { updateMeetingAction, type ActionState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';
import MeetingFormFields from './MeetingFormFields';

interface EditMeetingFormProps {
  meeting: SacramentMeeting;
}

export default function EditMeetingForm({ meeting }: EditMeetingFormProps) {
  const action = updateMeetingAction.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <MeetingFormFields
        state={state}
        values={{
          date: meeting.date,
          meetingType: meeting.meetingType,
          presiding: meeting.presiding,
          conducting: meeting.conducting,
          openingPrayer: meeting.openingPrayer,
          closingPrayer: meeting.closingPrayer,
          openingHymnNumber: meeting.openingHymn.number,
          openingHymnTitle: meeting.openingHymn.title,
          sacramentHymnNumber: meeting.sacramentHymn.number,
          sacramentHymnTitle: meeting.sacramentHymn.title,
          closingHymnNumber: meeting.closingHymn.number,
          closingHymnTitle: meeting.closingHymn.title,
        }}
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  );
}
