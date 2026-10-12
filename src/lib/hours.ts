// Opening hours and the "open now" logic, always in London time.

export const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const h = (hours: number) => hours * 60;

/** [opens, closes] in minutes after midnight, indexed Sun..Sat */
export const HOURS: [number, number][] = [
  [h(9), h(17)], // Sun
  [h(9), h(18)], // Mon
  [h(9), h(18)],
  [h(9), h(18)],
  [h(9), h(18)],
  [h(9), h(18)], // Fri
  [h(8), h(17)], // Sat
];

/** Display order for the hours list: Monday first */
export const WEEK = [1, 2, 3, 4, 5, 6, 0];

export type Moment = { day: number; minutes: number; preview: boolean };

/** "9am", "5pm", "8:30am" */
export function clock(minutes: number, withSuffix = true) {
  const hr = Math.floor(minutes / 60);
  const min = minutes % 60;
  const twelve = hr % 12 === 0 ? 12 : hr % 12;
  const suffix = withSuffix ? (hr < 12 ? 'am' : 'pm') : '';
  return `${twelve}${min ? `:${String(min).padStart(2, '0')}` : ''}${suffix}`;
}

export function londonNow(date = new Date()): Moment {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = SHORT.indexOf(get('weekday'));
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  return { day: day < 0 ? date.getDay() : day, minutes, preview: false };
}

/** Accepts sat-11:30, sat-1130, saturday-8:15, sat-8 */
export function parseAt(raw: string | null): Moment | null {
  if (!raw) return null;
  const m = raw
    .trim()
    .toLowerCase()
    .match(/^([a-z]{3})[a-z]*[-_ ]?(\d{1,2})(?::?(\d{2}))?$/);
  if (!m) return null;
  const day = DAY_KEYS.indexOf(m[1] as DayKey);
  const hr = Number(m[2]);
  const min = Number(m[3] ?? 0);
  if (day < 0 || hr > 23 || min > 59) return null;
  return { day, minutes: hr * 60 + min, preview: true };
}

/** ?at= can sit before the hash (/?at=sat-11:30#/) or inside it (#/menu?at=sat-11:30) */
export function atFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const fromSearch = new URLSearchParams(window.location.search).get('at');
  if (fromSearch) return fromSearch;
  const q = window.location.hash.indexOf('?');
  return q >= 0 ? new URLSearchParams(window.location.hash.slice(q + 1)).get('at') : null;
}

export type Status = {
  open: boolean;
  label: string; // "Open now" / "Closed now"
  detail: string; // "until 5pm" / "opens 9am"
  line: string; // the line for the moment
  busy: boolean; // Saturday while open
  today: number;
};

export function statusAt(at: Moment): Status {
  const [opens, closes] = HOURS[at.day];
  const open = at.minutes >= opens && at.minutes < closes;

  if (open) {
    const saturday = at.day === 6;
    return {
      open,
      label: 'Open now',
      detail: `until ${clock(closes)}`,
      line: saturday ? 'Saturdays get busy. Doors at 8 if you want first pick.' : 'Pull up a chair.',
      busy: saturday,
      today: at.day,
    };
  }

  const beforeOpening = at.minutes < opens;
  const nextDay = beforeOpening ? at.day : (at.day + 1) % 7;
  const nextOpen = HOURS[nextDay][0];
  return {
    open,
    label: 'Closed now',
    detail: `opens ${clock(nextOpen)}`,
    line: beforeOpening
      ? `Back at ${clock(nextOpen, false)} this morning.`
      : `Back at ${clock(nextOpen, false)} tomorrow.`,
    busy: false,
    today: at.day,
  };
}

export function previewLabel(at: Moment) {
  return `${DAY_NAMES[at.day]} ${String(Math.floor(at.minutes / 60)).padStart(2, '0')}:${String(at.minutes % 60).padStart(2, '0')}`;
}
