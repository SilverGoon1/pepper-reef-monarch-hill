export const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export type DayHours = {
  closed: boolean;
  open: string;
  close: string;
};

export type WeeklyHours = Record<DayKey, DayHours>;

export const DAY_LABELS: Record<DayKey, string> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

export const DAY_SHORT: Record<DayKey, string> = {
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

const OPEN_DAY: DayHours = { closed: false, open: "11:00", close: "20:00" };

export const DEFAULT_WEEKLY_HOURS: WeeklyHours = {
  sun: { ...OPEN_DAY },
  mon: { ...OPEN_DAY },
  tue: { ...OPEN_DAY },
  wed: { ...OPEN_DAY },
  thu: { ...OPEN_DAY },
  fri: { ...OPEN_DAY },
  sat: { ...OPEN_DAY },
};

function cleanClock(value: string, fallback: string) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim());
  if (!m) return fallback;
  const h = Math.min(23, Math.max(0, Number(m[1])));
  const min = Math.min(59, Math.max(0, Number(m[2])));
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function parseWeeklyHours(raw: unknown): WeeklyHours {
  const obj = typeof raw === "string" ? safeJson(raw) : raw && typeof raw === "object" ? raw : {};
  const src = obj as Record<string, Partial<DayHours>>;
  const next = { ...DEFAULT_WEEKLY_HOURS };
  for (const key of DAY_KEYS) {
    const d = src[key] ?? {};
    next[key] = {
      closed: Boolean(d.closed),
      open: cleanClock(String(d.open ?? OPEN_DAY.open), OPEN_DAY.open),
      close: cleanClock(String(d.close ?? OPEN_DAY.close), OPEN_DAY.close),
    };
  }
  return next;
}

function safeJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function formatClock(hhmm: string) {
  const [hs, ms] = cleanClock(hhmm, "11:00").split(":");
  const h = Number(hs);
  const m = Number(ms);
  const am = h < 12;
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${am ? "AM" : "PM"}`;
}

export function hoursSummary(hours: WeeklyHours) {
  const slot = (d: DayHours) => (d.closed ? "closed" : `${d.open}-${d.close}`);
  const all = DAY_KEYS.map((k) => hours[k] ?? DEFAULT_WEEKLY_HOURS[k]);
  if (all.every((d) => slot(d) === slot(all[0]))) {
    if (all[0].closed) return "Closed";
    return `Open Daily ${formatClock(all[0].open)} – ${formatClock(all[0].close)}`;
  }
  return DAY_KEYS.map((k) => {
    const d = hours[k];
    return d.closed ? `${DAY_SHORT[k]} closed` : `${DAY_SHORT[k]} ${formatClock(d.open)}–${formatClock(d.close)}`;
  }).join(" · ");
}

const WEEKDAY: Record<string, DayKey> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

export function isOpenNow(hours: WeeklyHours, at = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(at);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const key = WEEKDAY[wd] ?? "mon";
  const day = hours[key] ?? DEFAULT_WEEKLY_HOURS[key];
  if (day.closed) return false;
  const now = hour * 60 + minute;
  const [oh, om] = day.open.split(":").map(Number);
  const [ch, cm] = day.close.split(":").map(Number);
  return now >= oh * 60 + om && now < ch * 60 + cm;
}

export function etaMinutes(prep: number, delivery: number, fulfillment: "pickup" | "delivery") {
  const p = Math.max(5, Math.round(prep || 25));
  const d = Math.max(5, Math.round(delivery || 40));
  return fulfillment === "delivery" ? p + d : p;
}

/** First open kitchen slot at least `leadMinutes` from now, on a 15-minute grid. */
export function nextOpenSlot(hours: WeeklyHours, leadMinutes = 15, from = new Date()) {
  const start = new Date(from.getTime() + leadMinutes * 60 * 1000);
  start.setSeconds(0, 0);
  const min = start.getMinutes();
  start.setMinutes(min + ((15 - (min % 15)) % 15));
  for (let i = 0; i < 14 * 24 * 4; i += 1) {
    const at = new Date(start.getTime() + i * 15 * 60 * 1000);
    if (isOpenNow(hours, at)) return at;
  }
  return null;
}

export function nyHm(at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: NY,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(at);
  const h = parts.find((p) => p.type === "hour")?.value ?? "12";
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  const hour = h === "24" ? "00" : h.padStart(2, "0");
  return `${hour}:${m}`;
}

const NY = "America/New_York";

export function nyYmd(at = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: NY,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);
}

export function formatShopDay(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    timeZone: NY,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShopWhen(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", {
    timeZone: NY,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatShopClock(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    timeZone: NY,
    hour: "numeric",
    minute: "2-digit",
  });
}

function zoneParts(at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: NY,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(at);
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const hour = g("hour") === 24 ? 0 : g("hour");
  return { y: g("year"), m: g("month"), d: g("day"), h: hour, min: g("minute") };
}

/** Convert an Egg Harbor Township wall-clock date+time to a Date. */
export function nyWallToDate(date: string, time: string) {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  const tm = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!dm || !tm) return null;
  const y = Number(dm[1]);
  const m = Number(dm[2]);
  const d = Number(dm[3]);
  const hh = Math.min(23, Math.max(0, Number(tm[1])));
  const mm = Math.min(59, Math.max(0, Number(tm[2])));
  const utcGuess = Date.UTC(y, m - 1, d, hh, mm);
  const got = zoneParts(new Date(utcGuess));
  const gotMs = Date.UTC(got.y, got.m - 1, got.d, got.h, got.min);
  const wantMs = Date.UTC(y, m - 1, d, hh, mm);
  const at = new Date(utcGuess + (wantMs - gotMs));
  return Number.isNaN(at.getTime()) ? null : at;
}

