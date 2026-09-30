import type { ActionState } from '@/lib/actions';

export interface MeetingFormValues {
  date?: string;
  meetingType?: string;
  presiding?: string;
  conducting?: string;
  openingPrayer?: string;
  closingPrayer?: string;
  openingHymnNumber?: number;
  openingHymnTitle?: string;
  sacramentHymnNumber?: number;
  sacramentHymnTitle?: string;
  closingHymnNumber?: number;
  closingHymnTitle?: string;
}

interface MeetingFormFieldsProps {
  values?: MeetingFormValues;
  state: ActionState;
}

export default function MeetingFormFields({
  values = {},
  state,
}: MeetingFormFieldsProps) {
  const error = (name: string) => state.errors?.[name]?.join(', ');

  return (
    <div className="flex flex-col gap-4">
      <label>
        Date
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={values.date}
          aria-describedby="date-error"
          className="block w-full rounded border p-2"
        />
        <span id="date-error" aria-live="polite" className="text-sm text-red-600">
          {error('date')}
        </span>
      </label>

      <label>
        Meeting type
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={values.meetingType ?? 'regular'}
          aria-describedby="meetingType-error"
          className="block w-full rounded border p-2"
        >
          {['regular', 'testimony', 'stake', 'general', 'special'].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <span id="meetingType-error" aria-live="polite" className="text-sm text-red-600">
          {error('meetingType')}
        </span>
      </label>

      {[
        ['presiding', 'Presiding', 'text', values.presiding],
        ['conducting', 'Conducting', 'text', values.conducting],
        ['openingPrayer', 'Opening prayer', 'text', values.openingPrayer],
        ['closingPrayer', 'Closing prayer', 'text', values.closingPrayer],
        ['openingHymnNumber', 'Opening hymn number', 'number', values.openingHymnNumber],
        ['openingHymnTitle', 'Opening hymn title', 'text', values.openingHymnTitle],
        ['sacramentHymnNumber', 'Sacrament hymn number', 'number', values.sacramentHymnNumber],
        ['sacramentHymnTitle', 'Sacrament hymn title', 'text', values.sacramentHymnTitle],
        ['closingHymnNumber', 'Closing hymn number', 'number', values.closingHymnNumber],
        ['closingHymnTitle', 'Closing hymn title', 'text', values.closingHymnTitle],
      ].map(([name, label, type, value]) => (
        <label key={name as string}>
          {label}
          <input
            id={name as string}
            name={name as string}
            type={type as string}
            defaultValue={value as string | number | undefined}
            aria-describedby={`${name}-error`}
            className="block w-full rounded border p-2"
          />
          <span
            id={`${name}-error`}
            aria-live="polite"
            className="text-sm text-red-600"
          >
            {error(name as string)}
          </span>
        </label>
      ))}

      {state.message && (
        <p aria-live="polite" className="text-red-600">
          {state.message}
        </p>
      )}
    </div>
  );
}
