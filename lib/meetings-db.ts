import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const ITEMS_PER_PAGE = 5;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }
  return neon(process.env.DATABASE_URL);
}

export async function getMeetings(query = '', currentPage = 1): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (Math.max(currentPage, 1) - 1) * ITEMS_PER_PAGE;
  const rows = await getSql()`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ''): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await getSql()`
    SELECT COUNT(*) AS count FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  const rows = await getSql()`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings WHERE date = ${date}::date
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await getSql()`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutations will be implemented with the Week 04 forms.
export async function addMeeting(_data: Omit<SacramentMeeting, 'id'>): Promise<SacramentMeeting> {
  void _data;
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(_id: number, _updates: Partial<SacramentMeeting>): Promise<SacramentMeeting | null> {
  void _id;
  void _updates;
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(_id: number): Promise<boolean> {
  void _id;
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}
