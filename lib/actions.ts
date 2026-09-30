'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeeting,
} from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';

export type ActionState = {
  message?: string;
  errors?: Record<string, string[]>;
};

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().trim().min(1, 'Presiding is required.'),
  conducting: z.string().trim().min(1, 'Conducting is required.'),
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
  openingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
});

function getFormData(formData: FormData) {
  return {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? ''),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),
    openingPrayer: String(formData.get('openingPrayer') ?? ''),
    closingPrayer: String(formData.get('closingPrayer') ?? ''),
    openingHymnNumber: String(formData.get('openingHymnNumber') ?? ''),
    openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
    sacramentHymnNumber: String(formData.get('sacramentHymnNumber') ?? ''),
    sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
    closingHymnNumber: String(formData.get('closingHymnNumber') ?? ''),
    closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
  };
}

function toMeeting(data: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: [],
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: [],
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

function validationState(result: z.ZodSafeParseError<unknown>): ActionState {
  return {
    message: 'Please correct the highlighted fields.',
    errors: result.error.flatten().fieldErrors as Record<string, string[]>,
  };
}

export async function createMeeting(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const result = MeetingFormSchema.safeParse(getFormData(formData));
  if (!result.success) return validationState(result);

  try {
    await addMeeting(toMeeting(result.data));
  } catch (error) {
    console.error(error);
    return { message: 'Unable to create the meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeetingAction(
  id: number,
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const result = MeetingFormSchema.safeParse(getFormData(formData));
  if (!result.success) return validationState(result);

  try {
    const meeting = await updateMeeting(id, toMeeting(result.data));
    if (!meeting) return { message: 'Meeting not found.' };
  } catch (error) {
    console.error(error);
    return { message: 'Unable to update the meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(
  id: number,
  _formData: FormData
): Promise<void> {
  void _formData;
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error(error);
    throw new Error('Unable to delete the meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
